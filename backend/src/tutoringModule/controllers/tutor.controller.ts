import { TutorService } from './../services/tutor.service';
import { Roles } from '../../authModule/roles/roles.decorator';
import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { UserRole } from 'src/authModule/entities/user.entity';
import { Tutor } from '../entities/tutor.entity';

@Crud({
  model: {
    type: Tutor,
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
      decorators: [Roles(UserRole.LECTURER, UserRole.ADMIN, UserRole.STUDENT)],
    },
    updateOneBase: {
      decorators: [Roles(UserRole.LECTURER, UserRole.ADMIN, UserRole.STUDENT)],
    },
    deleteOneBase: {
      decorators: [Roles(UserRole.LECTURER, UserRole.ADMIN, UserRole.STUDENT)],
    },
  },
})
@Controller('tutor')
export class TutorController implements CrudController<Tutor> {
  constructor(public service: TutorService) {}
}
