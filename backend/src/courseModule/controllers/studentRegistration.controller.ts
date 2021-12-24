import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { StudentRegistration } from '../entities/studentRegistration.entity';
import { StudentRegistrationService } from '../services/studentRegistration.service';

@Crud({
  model: {
    type: StudentRegistration,
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
@Controller('student-registration')
export class StudentRegistrationController
  implements CrudController<StudentRegistration>
{
  constructor(public service: StudentRegistrationService) {}
}
