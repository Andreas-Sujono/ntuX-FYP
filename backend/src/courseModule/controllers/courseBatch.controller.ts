import { Roles } from './../../authModule/roles/roles.decorator';
import { Controller, Query } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { CourseBatch } from '../entities/courseBatch.entity';
import { CoursebatchService } from '../services/courseBatch.service';
import { UserRole } from 'src/authModule/entities/user.entity';

@Crud({
  model: {
    type: CourseBatch,
  },
  query: {
    join: {
      course: {
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
@Controller('course-batch')
export class CourseBatchController implements CrudController<CourseBatch> {
  constructor(public service: CoursebatchService) {}
}
