import { TutorRequestService } from './../services/tutorRequest.service';
import { TutorRequest } from './../entities/tutorRequest.entity';
import { Roles } from '../../authModule/roles/roles.decorator';
import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { UserRole } from 'src/authModule/entities/user.entity';
import { UserData } from 'src/authModule/user.decorator';

@Crud({
  model: {
    type: TutorRequest,
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
@Controller('tutor-request')
export class TutorRequestController implements CrudController<TutorRequest> {
  constructor(public service: TutorRequestService) {}

  @Get('request')
  async getMyRequest(@UserData('userId') userId: number) {
    return this.service.getMyRequest(userId);
  }

  @Post('request')
  async createRequest(@UserData('userId') userId: number, @Body() body: any) {
    return this.service.createRequest(userId, body);
  }

  @Patch('request')
  async updateRequest(@UserData('userId') userId: number, @Body() body: any) {
    return this.service.updateRequest(body);
  }

  @Get('offer')
  async getMyOffer(@UserData('userId') userId: number) {
    return this.service.getMyOffer(userId);
  }

  @Patch('offer')
  async updateOffer(@UserData('userId') userId: number, @Body() body: any) {
    return this.service.updateOffer(body);
  }
}
