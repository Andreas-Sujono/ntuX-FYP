import { Roles } from './../../authModule/roles/roles.decorator';
import { Controller } from '@nestjs/common';
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
  async createOne(@ParsedRequest() req: CrudRequest, @ParsedBody() dto: any) {
    delete dto.id;
    return this.service.createOne(req, dto);
  }
}
