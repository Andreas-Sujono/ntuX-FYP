import { Roles } from '../../authModule/roles/roles.decorator';
import { Controller, Post } from '@nestjs/common';
import {
  Crud,
  CrudController,
  CrudRequest,
  Override,
  ParsedBody,
} from '@nestjsx/crud';
import { UserRole } from 'src/authModule/entities/user.entity';
import { RewardRedeemed } from '../entities/rewardRedeemed.entity';
import { RewardRedeemedService } from '../services/rewardRedeemed.service';
import { UserData } from 'src/authModule/user.decorator';

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
  constructor(public service: RewardRedeemedService) {}

  @Override()
  async getMany(@UserData('userId') userId: number) {
    return this.service.find({
      where: {
        user: userId,
      },
      relations: ['reward'],
    });
  }

  @Override()
  async createOne(
    @ParsedBody() dto: RewardRedeemed,
    @UserData('userId') userId: number,
  ) {
    return this.service.createRewardRedeemed(dto, userId);
  }
}
