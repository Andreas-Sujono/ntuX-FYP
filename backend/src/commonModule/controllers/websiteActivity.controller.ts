import { Roles } from '../../authModule/roles/roles.decorator';
import { Controller, Get, Query } from '@nestjs/common';
import { Crud, CrudController, Override, ParsedBody } from '@nestjsx/crud';
import { UserRole } from 'src/authModule/entities/user.entity';
import { WebsiteActivity } from '../entities/websiteActivity.entity';
import { WebsiteActivityService } from '../services/websiteActivity.service';
import { Public } from 'src/authModule/public.decorator';
import { UserData } from 'src/authModule/user.decorator';
import { StudentWebsiteActivity } from '../entities/StudentWebsiteActivity.entity';

@Crud({
  model: {
    type: WebsiteActivity,
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
@Controller('website-activity')
export class WebsiteActivityController
  implements CrudController<WebsiteActivity>
{
  constructor(public service: WebsiteActivityService) {}

  @Get('summary')
  @Roles(UserRole.ADMIN, UserRole.LECTURER)
  async getSummary(
    @Query('interval') interval: 'd' | 'w' | 'm',
    @Query('userId') userId: string,
  ) {
    if (userId) return this.service.getStudentSummary(interval, userId);
    return this.service.getSummary(interval);
  }

  @Get('summary/student')
  @Public()
  async getStudentSummary(
    @Query('interval') interval: 'd' | 'w' | 'm',
    @Query('userId') userId: string,
  ) {
    if (userId) return this.service.getStudentSummary(interval, userId);
    return this.service.getSummary(interval);
  }

  @Override()
  @Public()
  async createOne(
    @ParsedBody() dto: WebsiteActivity | StudentWebsiteActivity,
    @UserData('userId') userId: string,
  ) {
    return this.service.updateWebsiteActivity(
      dto,
      userId || (dto as any)?.user || (dto as any).userId || null,
    );
  }
}
