import { Roles } from '../roles/roles.decorator';
import { Controller, Get } from '@nestjs/common';
import { Crud, CrudController, CrudRequest, Override } from '@nestjsx/crud';
import { User, UserRole } from 'src/authModule/entities/user.entity';
import { UserService } from '../services/user.service';
import { Public } from '../public.decorator';

@Crud({
  model: {
    type: User,
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
      decorators: [Roles(UserRole.ADMIN)],
    },
    updateOneBase: {
      decorators: [Roles(UserRole.ADMIN)],
    },
    deleteOneBase: {
      decorators: [Roles(UserRole.ADMIN)],
    },
  },
})
@Controller('user')
export class UserController implements CrudController<User> {
  constructor(public service: UserService) {}

  @Override()
  async createOne(req: CrudRequest, dto: User) {
    return this.service.createUser(dto);
  }

  @Get('top')
  @Public()
  async getTopUsers() {
    return this.service.getTopUsers();
  }
}
