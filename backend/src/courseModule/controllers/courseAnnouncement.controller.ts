import { Roles } from './../../authModule/roles/roles.decorator';
import { Controller, Query } from '@nestjs/common';
import {
  Crud,
  CrudController,
  CrudRequest,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@nestjsx/crud';
import { CourseAnnouncement } from '../entities/courseAnnouncement.entity';
import { CourseAnnouncementService } from '../services/courseAnnouncement.service';
import { UserRole } from 'src/authModule/entities/user.entity';
import { UserData } from 'src/authModule/user.decorator';

@Crud({
  model: {
    type: CourseAnnouncement,
  },
  query: {
    join: {
      course: {
        eager: true,
      },
      courseBatch: {
        eager: true,
      },
    },
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
      decorators: [Roles(UserRole.LECTURER, UserRole.ADMIN, UserRole.STUDENT)],
    },
    getOneBase: {
      decorators: [Roles(UserRole.LECTURER, UserRole.ADMIN, UserRole.STUDENT)],
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
@Controller('course-announcement')
export class CourseAnnouncementController
  implements CrudController<CourseAnnouncement>
{
  constructor(public service: CourseAnnouncementService) {}

  @Override()
  async getMany(
    @Query('courseId') courseId: string,
    @Query('batchId') batchId: string,
  ) {
    return this.service.getCourseAnnouncements(courseId, batchId);
  }

  @Override()
  async createOne(@ParsedRequest() req: CrudRequest, @ParsedBody() dto: any) {
    delete dto.id;
    return this.service.createOne(req, dto);
  }
}
