import { Roles } from './../../authModule/roles/roles.decorator';
import { CourseContent } from './../entities/courseContent.entity';
import { Body, Controller } from '@nestjs/common';
import { Crud, CrudController, Override } from '@nestjsx/crud';
import { CourseContentService } from '../services/courseContent.service';
import { UserRole } from 'src/authModule/entities/user.entity';

@Crud({
  model: {
    type: CourseContent,
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
      decorators: [Roles(UserRole.LECTURER)],
    },
    updateOneBase: {
      decorators: [Roles(UserRole.LECTURER)],
    },
    deleteOneBase: {
      decorators: [Roles(UserRole.LECTURER)],
    },
  },
})
@Controller('course-content')
export class CourseContentController implements CrudController<CourseContent> {
  constructor(public service: CourseContentService) {}

  @Override()
  async createOrUpdateContent(@Body() body: any) {
    return this.service.createOrUpdateCourseContent(body.content);
  }
}
