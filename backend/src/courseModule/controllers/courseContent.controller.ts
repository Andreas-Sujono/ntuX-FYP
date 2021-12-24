import { CourseContent } from './../entities/courseContent.entity';
import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { CourseContentService } from '../services/courseContent.service';

@Crud({
  model: {
    type: CourseContent,
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
@Controller('course-content')
export class CourseContentController implements CrudController<CourseContent> {
  constructor(public service: CourseContentService) {}
}
