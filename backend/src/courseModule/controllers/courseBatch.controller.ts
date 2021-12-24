import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { CourseBatch } from '../entities/courseBatch.entity';
import { CoursebatchService } from '../services/courseBatch.service';

@Crud({
  model: {
    type: CourseBatch,
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
@Controller('course-batch')
export class CourseBatchController implements CrudController<CourseBatch> {
  constructor(public service: CoursebatchService) {}
}
