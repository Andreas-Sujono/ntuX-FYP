import { CourseWebsiteActivity } from '../entities/courseWebsiteActivity.entity';
import { Roles } from '../../authModule/roles/roles.decorator';
import { Controller, Get, Query } from '@nestjs/common';
import { Crud, CrudController, Override, ParsedBody } from '@nestjsx/crud';
import { UserRole } from 'src/authModule/entities/user.entity';
import { Public } from 'src/authModule/public.decorator';
import { UserData } from 'src/authModule/user.decorator';
import { CourseWebsiteActivityService } from '../services/courseWebsiteActivity.service';

@Crud({
  model: {
    type: CourseWebsiteActivity,
  },
  routes: {
    only: ['createOneBase', 'getManyBase'],
    createOneBase: {
      decorators: [Roles(UserRole.LECTURER, UserRole.ADMIN, UserRole.STUDENT)],
    },
  },
})
@Controller('course-website-activity')
export class CourseWebsiteActivityController
  implements CrudController<CourseWebsiteActivity>
{
  constructor(public service: CourseWebsiteActivityService) {}

  @Get('summary')
  @Roles(UserRole.ADMIN, UserRole.LECTURER)
  async getSummary(
    @Query('interval') interval: 'd' | 'w' | 'm',
    @Query('courseId') courseId: number,
  ) {
    return this.service.getSummary(interval, courseId);
  }

  @Override()
  async createOne(
    @ParsedBody() dto: CourseWebsiteActivity,
    @UserData('userId') userId: string,
  ) {
    return this.service.updateWebsiteActivity(
      dto,
      userId || (dto as any)?.user || (dto as any).userId || null,
    );
  }
}
