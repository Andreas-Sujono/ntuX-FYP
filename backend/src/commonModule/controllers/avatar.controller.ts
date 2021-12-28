import { Roles } from '../../authModule/roles/roles.decorator';
import { Controller, Param, Post } from '@nestjs/common';
import { Crud, CrudController, Override } from '@nestjsx/crud';
import { UserRole } from 'src/authModule/entities/user.entity';
import { Public } from 'src/authModule/public.decorator';
import { Avatar } from '../entities/avatar.entity';
import { AvatarService } from '../services/avatarShop.service';
import { UserData } from 'src/authModule/user.decorator';

@Crud({
  model: {
    type: Avatar,
  },
  routes: {
    only: [
      'getOneBase',
      // 'updateOneBase',
      // 'createOneBase',
      'getManyBase',
      // 'deleteOneBase',
    ],
    getManyBase: {
      decorators: [Public()],
    },
    getOneBase: {
      decorators: [Public()],
    },
    createOneBase: {
      decorators: [Roles(UserRole.LECTURER, UserRole.ADMIN, UserRole.STUDENT)],
    },
    updateOneBase: {
      decorators: [Roles(UserRole.LECTURER, UserRole.ADMIN)],
    },
    deleteOneBase: {
      decorators: [Roles(UserRole.LECTURER, UserRole.ADMIN)],
    },
  },
})
@Controller('avatar')
export class AvatarController implements CrudController<Avatar> {
  constructor(public service: AvatarService) {}

  @Post('buy/:id')
  async buyAvatar(
    @Param('id') avatarId: number,
    @UserData('userId') userId: number,
  ) {
    return this.service.buyAvatar(avatarId, userId);
  }

  @Post('use/:id')
  async useAvatar(
    @Param('id') avatarId: number,
    @UserData('userId') userId: number,
  ) {
    return this.service.useAvatar(avatarId, userId);
  }
}
