import { Roles } from '../../authModule/roles/roles.decorator';
import { Controller, Param, Post } from '@nestjs/common';
import {
  Crud,
  CrudController,
  CrudRequest,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@nestjsx/crud';
import { UserRole } from 'src/authModule/entities/user.entity';
import { RewardRedeemed } from '../entities/rewardRedeemed.entity';
import { RewardRedeemedService } from '../services/rewardRedeemed.service';
import { UserData } from 'src/authModule/user.decorator';
import { NotificationService } from '../services/notification.service';
import { EVENT_TYPE } from '../entities/notification.entity';

@Crud({
  model: {
    type: RewardRedeemed,
  },
  routes: {
    only: [
      'getOneBase',
      'updateOneBase',
      'createOneBase',
      'getManyBase',
      'deleteOneBase',
    ],
    createOneBase: {
      decorators: [Roles(UserRole.LECTURER, UserRole.ADMIN, UserRole.STUDENT)],
    },
    updateOneBase: {
      decorators: [Roles(UserRole.LECTURER, UserRole.ADMIN, UserRole.STUDENT)],
    },
    deleteOneBase: {
      decorators: [Roles(UserRole.LECTURER, UserRole.ADMIN, UserRole.STUDENT)],
    },
  },
})
@Controller('reward-redeemed')
export class RewardRedeemedController
  implements CrudController<RewardRedeemed>
{
  constructor(
    public service: RewardRedeemedService,
    public notificationService: NotificationService,
  ) {}

  @Override()
  async getMany(
    @UserData('userId') userId: number,
    @UserData('role') role: UserRole,
  ) {
    if (role === UserRole.ADMIN || role === UserRole.LECTURER) {
      return this.service.find({
        where: {},
        relations: ['reward', 'user'],
      });
    }

    return this.service.find({
      where: {
        user: userId,
      },
      relations: ['reward', 'user'],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  @Override()
  async createOne(
    @ParsedBody() dto: RewardRedeemed,
    @UserData('userId') userId: number,
  ) {
    delete dto.id;
    return this.service.createRewardRedeemed(dto, userId);
  }

  @Override()
  async updateOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: RewardRedeemed,
    @UserData('userId') userId: number,
    @Param('id') id: number,
  ) {
    return this.service.updateRewardRedeemed(req, dto);
  }
}
