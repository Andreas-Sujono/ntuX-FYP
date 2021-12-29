import { Roles } from './../../authModule/roles/roles.decorator';
import { Controller, Get, Param, Post } from '@nestjs/common';
import {
  Crud,
  CrudController,
  CrudRequest,
  Override,
  ParsedRequest,
  ParsedBody,
} from '@nestjsx/crud';
import { Public } from 'src/authModule/public.decorator';
import { Course } from '../entities/course.entity';
import { CourseService } from '../services/course.service';
import { UserRole } from 'src/authModule/roles/roles.enum';
import { UserData } from 'src/authModule/user.decorator';

@Crud({
  model: {
    type: Course,
  },
  query: {
    join: {
      courseBatches: {
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

  @Get('me')
  async getMyCourse(@UserData('userId') userId: string) {
    return this.service.getStudentCourses(userId);
  }

  @Get(':courseId/registered')
  async getOneRegistered(
    @UserData('userId') userId: string,
    @Param('courseId') courseId: string,
  ) {
    return this.service.getStudentRegistered(userId, courseId);
  }

  @Get('recommended')
  async getRecommended(@UserData('userId') userId: string) {
    return this.service.getRecommendationCourses(userId);
  }

  @Override()
  async getOne(@Param('id') id: string) {
    return this.service.adminGetOneCourse(id);
  }

  @Override()
  async createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: Course,
  ) {
    return this.service.createCourse(req, dto);
  }
}
