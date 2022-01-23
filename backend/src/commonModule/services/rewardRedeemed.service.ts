import { PremiumSetting } from './../entities/premiumSetting.entity';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudRequest } from '@nestjsx/crud';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { User } from 'src/authModule/entities/user.entity';
import { Repository } from 'typeorm';
import { EVENT_TYPE } from '../entities/notification.entity';
import { Reward } from '../entities/reward.entity';
import { RewardRedeemed } from '../entities/rewardRedeemed.entity';
import { NotificationService } from './notification.service';

@Injectable()
export class RewardRedeemedService extends TypeOrmCrudService<RewardRedeemed> {
  constructor(
    @InjectRepository(RewardRedeemed) repo,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Reward) private rewardRepo: Repository<Reward>,
    @InjectRepository(PremiumSetting)
    private premiumSettingRepo: Repository<PremiumSetting>,
    private notificationService: NotificationService,
  ) {
    super(repo);
  }

  async createRewardRedeemed(dto: RewardRedeemed, userId: number) {
    dto.user = userId as any;
    const [user, reward] = await Promise.all([
      this.userRepo.findOne({
        where: {
          id: userId as any,
        },
        relations: ['premiumSetting'],
      }),
      this.rewardRepo.findOne({ id: dto.reward as any }),
    ]);
    console.log(user, reward);

    //validate totalPoint
    if (user.totalPoints < reward.totalExpsRequired)
      throw new BadRequestException('Not enough points');

    if (reward.totalLimit !== null) {
      if (reward.totalLimit <= reward.redeemedCount) {
        throw new BadRequestException('Reward limit reached');
      }
    }

    //if buy default reward
    if (reward.isDefault) {
      const premiumSetting = user.premiumSetting;
      console.log('premiumSetting: ', premiumSetting);
      const monthTime = 30 * 24 * 60 * 60 * 1000;

      if (premiumSetting) {
        premiumSetting.expiredAt = premiumSetting.expiredAt || new Date();
        premiumSetting.premiumPortfolioExpiredAt =
          premiumSetting.premiumPortfolioExpiredAt || new Date();
        premiumSetting.pointMultiplierExpiredAt =
          premiumSetting.pointMultiplierExpiredAt || new Date();
        premiumSetting.expMultiplierExpiredAt =
          premiumSetting.expMultiplierExpiredAt || new Date();
      }

      //reward 1, 1 month premium
      if (reward.id === 1) {
        if (premiumSetting) {
          const expiredAt = new Date(
            Math.max(
              Date.now(),
              new Date(premiumSetting.expiredAt).getTime() + monthTime,
            ),
          );

          await this.premiumSettingRepo.update(
            { id: premiumSetting.id },
            {
              premiumPortfolioEnabled: true,
              expiredAt: expiredAt,
              premiumPortfolioExpiredAt: expiredAt,
            },
          );
        } else {
          return await this.premiumSettingRepo.save({
            premiumPortfolioEnabled: true,
            expiredAt: new Date(Date.now() + monthTime),
            premiumPortfolioExpiredAt: new Date(Date.now() + monthTime),
            user: user.id as any,
          });
        }
        console.log('finish');
      }
      //reward 2, 3 month premium
      if (reward.id === 2) {
        if (premiumSetting) {
          const expiredAt = new Date(
            Math.max(
              Date.now(),
              new Date(premiumSetting.expiredAt).getTime() + 3 * monthTime,
            ),
          );

          await this.premiumSettingRepo.update(
            { id: premiumSetting.id },
            {
              premiumPortfolioEnabled: true,
              expiredAt: expiredAt,
              premiumPortfolioExpiredAt: expiredAt,
            },
          );
        } else {
          await this.premiumSettingRepo.save({
            premiumPortfolioEnabled: true,
            expiredAt: new Date(Date.now() + 3 * monthTime),
            premiumPortfolioExpiredAt: new Date(Date.now() + 3 * monthTime),
            user: user.id as any,
          });
        }
      }
      //reward 3, multiplier for 1 month
      if (reward.id === 3) {
        if (premiumSetting) {
          const expiredAt = new Date(
            Math.max(
              Date.now(),
              new Date(premiumSetting.expiredAt).getTime() + 1 * monthTime,
            ),
          );

          await this.premiumSettingRepo.update(
            { id: premiumSetting.id },
            {
              pointMultiplier: 1.5,
              expMultiplier: 1.5,
              pointMultiplierExpiredAt: expiredAt,
              expMultiplierExpiredAt: expiredAt,
            },
          );
        } else {
          await this.premiumSettingRepo.save({
            pointMultiplier: 1.5,
            expMultiplier: 1.5,
            pointMultiplierExpiredAt: new Date(Date.now() + 1 * monthTime),
            expMultiplierExpiredAt: new Date(Date.now() + 1 * monthTime),
            user: user.id as any,
          });
        }
      }
    }

    //deduct points
    user.totalPoints -= reward.totalPointsRequired;

    const [res3, res2, res] = await Promise.all([
      this.userRepo.save(user),
      this.rewardRepo.save({
        ...reward,
        redeemedCount: (reward.redeemedCount || 0) + 1,
      }),
      this.repo.save(
        this.repo.create({
          ...dto,
          user: user.id as any,
          status: reward.isDefault ? 'REDEEMED' : 'PENDING',
        }),
      ),
    ]);

    if (!reward.isDefault) {
      //create notif
      this.notificationService.createNotification(
        {
          eventType: EVENT_TYPE.ADMIN_GOT_REWARD,
          name: 'New Reward Redeemed by student: ' + reward.name,
          metadata: res,
          itemId: res.id,
          toAllAdmin: true,
        },
        userId,
      );
    }

    return res;
  }

  async updateRewardRedeemed(req: CrudRequest, dto: RewardRedeemed) {
    const res = await this.updateOne(req, dto);

    //create notif
    if (dto.status) {
      const rewardDetail = await this.repo.findOne({
        where: { id: res.id },
        relations: ['user'],
      });
      this.notificationService.createNotification(
        {
          eventType: EVENT_TYPE.REWARD_CHANGE_STATUS,
          name: 'Your reward status is changed to ' + dto.status,
          metadata: res,
          itemId: res.id,
          user: rewardDetail.user,
        },
        dto.user as any,
      );
    }
    return res;
  }
}
