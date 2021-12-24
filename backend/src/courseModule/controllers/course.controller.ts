import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Course } from '../entities/course.entity';
import { CourseService } from '../services/course.service';

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
  },
})
@Controller('course')
export class CourseController implements CrudController<Course> {
  constructor(public service: CourseService) {}
}
