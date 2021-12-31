import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { User } from 'src/authModule/entities/user.entity';
import { Repository } from 'typeorm';
import { PremiumSetting } from '../entities/premiumSetting.entity';
import { Reward } from '../entities/reward.entity';
import { RewardRedeemed } from '../entities/rewardRedeemed.entity';

@Injectable()
export class RewardRedeemedService extends TypeOrmCrudService<RewardRedeemed> {
  constructor(
    @InjectRepository(RewardRedeemed) repo,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Reward) private rewardRepo: Repository<Reward>,
    @InjectRepository(PremiumSetting)
    private premiumSettingRepo: Repository<PremiumSetting>,
  ) {
    super(repo);
  }

  async createRewardRedeemed(dto: RewardRedeemed, userId: number) {
    const [user, reward] = await Promise.all([
      this.userRepo.findOne({ id: userId as any }),
      this.rewardRepo.findOne({ id: dto.reward as any }),
    ]);

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
      const premiumSetting = await this.premiumSettingRepo.findOne({
        user: userId as any,
      });
      const monthTime = 30 * 24 * 60 * 60 * 1000;

      //reward 1, 1 month premium
      if (reward.id === 1) {
        if (premiumSetting) {
          const expiredAt = new Date(
            Math.max(Date.now(), new Date(premiumSetting.expiredAt).getTime()) +
              monthTime,
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
            expiredAt: new Date(Date.now() + monthTime),
            premiumPortfolioExpiredAt: new Date(Date.now() + monthTime),
          });
        }
      }
      //reward 2, 3 month premium
      if (reward.id === 2) {
        if (premiumSetting) {
          const expiredAt = new Date(
            Math.max(Date.now(), new Date(premiumSetting.expiredAt).getTime()) +
              3 * monthTime,
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
          });
        }
      }
      //reward 3, multiplier for 1 month
      if (reward.id === 3) {
        if (premiumSetting) {
          const expiredAt = new Date(
            Math.max(Date.now(), new Date(premiumSetting.expiredAt).getTime()) +
              1 * monthTime,
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
          });
        }
      }
    }

    //deduct points
    user.totalPoints -= reward.totalExpsRequired;
    await this.userRepo.save(user);
    await this.rewardRepo.save({
      ...reward,
      redeemedCount: (reward.redeemedCount || 0) + 1,
    });

    return this.repo.save(
      this.repo.create({
        ...dto,
        user: userId as any,
        status: reward.isDefault ? 'REDEEMED' : 'PENDING',
      }),
    );
  }
}
