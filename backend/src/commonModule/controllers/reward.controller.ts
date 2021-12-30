import { Roles } from '../../authModule/roles/roles.decorator';
import { Controller } from '@nestjs/common';
import {
  Crud,
  CrudController,
  Override,
  ParsedRequest,
  CrudRequest,
  ParsedBody,
} from '@nestjsx/crud';
import { UserRole } from 'src/authModule/entities/user.entity';
import { Reward } from '../entities/reward.entity';
import { RewardService } from '../services/reward.entity';
import { Public } from 'src/authModule/public.decorator';

@Crud({
  model: {
    type: Reward,
  },
  routes: {
    only: [
      'getOneBase',
      'updateOneBase',
      'createOneBase',
      'getManyBase',
      'deleteOneBase',
    ],
    getManyBase: {
      decorators: [Public()],
    },
    getOneBase: {
      decorators: [Public()],
    },
    createOneBase: {
      decorators: [Roles(UserRole.LECTURER, UserRole.ADMIN)],
    },
    updateOneBase: {
      decorators: [Roles(UserRole.LECTURER, UserRole.ADMIN)],
    },
    deleteOneBase: {
      decorators: [Roles(UserRole.LECTURER, UserRole.ADMIN)],
    },
  },
})
@Controller('reward')
export class RewardController implements CrudController<Reward> {
  constructor(public service: RewardService) {}

  @Override()
  async createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: Reward,
  ) {
    delete dto.id;
    return this.service.createOne(req, dto);
  }
}
