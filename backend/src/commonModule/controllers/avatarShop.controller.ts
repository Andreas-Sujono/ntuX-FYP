import { Roles } from '../../authModule/roles/roles.decorator';
import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { UserRole } from 'src/authModule/entities/user.entity';
import { Public } from 'src/authModule/public.decorator';
import { AvatarShop } from '../entities/avatarShop.entity';
import { AvatarShopService } from '../services/avatarShop.service';

@Crud({
  model: {
    type: AvatarShop,
  },
  routes: {
    only: [
      'getOneBase',
      // 'updateOneBase',
      'createOneBase',
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
export class AvatarShopController implements CrudController<AvatarShop> {
  constructor(public service: AvatarShopService) {}
}
