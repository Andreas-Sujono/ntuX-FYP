import { Roles } from '../../authModule/roles/roles.decorator';
import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { UserRole } from 'src/authModule/entities/user.entity';
import { GoalTask } from '../entities/goalTask.entity';
import { GoalTaskService } from '../services/goalTask.entity';

@Crud({
  model: {
    type: GoalTask,
  },
  routes: {
    only: [
      'getOneBase',
      // 'updateOneBase',
      // 'createOneBase',
      'getManyBase',
      // 'deleteOneBase',
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
@Controller('goal-task')
export class GoalTaskController implements CrudController<GoalTask> {
  constructor(public service: GoalTaskService) {}
}
