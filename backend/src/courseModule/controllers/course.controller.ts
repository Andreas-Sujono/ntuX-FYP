import { Roles } from './../../authModule/roles/roles.decorator';
import { Controller, Get, Param, Post } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Public } from 'src/authModule/public.decorator';
import { Course } from '../entities/course.entity';
import { CourseService } from '../services/course.service';
import { UserRole } from 'src/authModule/roles/roles.enum';

@Crud({
  model: {
    type: Course,
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
@Controller('courses')
export class CourseController implements CrudController<Course> {
  constructor(public service: CourseService) {}

  @Get('public')
  @Public()
  async getAllPublic() {
    return this.service.getPublicAllCourses();
  }

  @Get('public/:courseId')
  @Public()
  async get1Course(@Param('courseId') courseId: number) {
    return this.service.getOneCourse(courseId);
  }
}
