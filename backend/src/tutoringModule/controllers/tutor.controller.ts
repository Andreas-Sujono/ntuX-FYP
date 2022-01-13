import { TutorService } from './../services/tutor.service';
import { Roles } from '../../authModule/roles/roles.decorator';
import { Body, Controller, Get, Query } from '@nestjs/common';
import {
  Crud,
  CrudController,
  CrudRequest,
  GetManyDefaultResponse,
  Override,
} from '@nestjsx/crud';
import { UserRole } from 'src/authModule/entities/user.entity';
import { Tutor } from '../entities/tutor.entity';
import { UserData } from 'src/authModule/user.decorator';

@Crud({
  model: {
    type: Tutor,
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
@Controller('tutor')
export class TutorController implements CrudController<Tutor> {
  constructor(public service: TutorService) {}

  @Override()
  async getMany(@Query('query') query: string) {
    return this.service.searchTutor(query);
  }

  @Override()
  async updateOne(@Body() body: any, @UserData('userId') userId: number) {
    return this.service.updateTutor(userId, body);
  }

  @Get('check-self')
  async checkSelfTutor(@UserData('userId') userId: number) {
    return this.service.checkSelfTutor(userId);
  }
}
