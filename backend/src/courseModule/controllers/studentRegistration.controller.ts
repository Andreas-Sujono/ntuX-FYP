import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Public } from 'src/authModule/public.decorator';
import { Roles } from 'src/authModule/roles/roles.decorator';
import { UserRole } from 'src/authModule/roles/roles.enum';
import { UserData } from 'src/authModule/user.decorator';
import { RegisterCourseDto } from '../dto/course.dto';
import { StudentRegistration } from '../entities/studentRegistration.entity';
import { StudentRegistrationService } from '../services/studentRegistration.service';

@Crud({
  model: {
    type: StudentRegistration,
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
@Controller('student-registration')
export class StudentRegistrationController
  implements CrudController<StudentRegistration>
{
  constructor(public service: StudentRegistrationService) {}

  @Post()
  @Public()
  async registerCourse(@Body() body: any, @UserData('role') role: string) {
    if (role === UserRole.LECTURER || role === UserRole.ADMIN) {
      return this.service.createStudentRegistration(
        body.userId,
        body.status,
        body.courseId,
        body.courseBatchId,
      );
    }

    return this.service.registerCourse(
      body.user,
      body.courseId,
      body.courseBatchId,
    );
  }

  @Patch(':id/status')
  @Roles(UserRole.LECTURER, UserRole.ADMIN)
  async changeStatus(@Body() body: any, @Param('id') id: string) {
    return this.service.changeStudentRegistrationStatus(id, body.status);
  }
}
