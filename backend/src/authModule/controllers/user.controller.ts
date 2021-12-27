import { Roles } from '../roles/roles.decorator';
import { Controller, Get, Param, BadRequestException } from '@nestjs/common';
import {
  Crud,
  CrudController,
  CrudRequest,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@nestjsx/crud';
import { User, UserRole } from 'src/authModule/entities/user.entity';
import { UserService } from '../services/user.service';
import { Public } from '../public.decorator';
import { UserData } from '../user.decorator';

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
    getManyBase: {
      decorators: [Roles(UserRole.ADMIN, UserRole.LECTURER)],
    },
    getOneBase: {
      decorators: [Roles(UserRole.ADMIN, UserRole.LECTURER)],
    },
    createOneBase: {
      decorators: [Roles(UserRole.ADMIN)],
    },
    updateOneBase: {
      decorators: [Roles(UserRole.ADMIN, UserRole.LECTURER)],
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

  @Override()
  async updateOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: User,
    @UserData('userId') userId: string,
    @UserData('role') role: string,
    @Param('id') id: string,
  ) {
    if (role === UserRole.STUDENT && id !== userId) {
      throw new BadRequestException('You can only update your own account');
    }
    return this.service.updateOne(req, dto);
  }
}
