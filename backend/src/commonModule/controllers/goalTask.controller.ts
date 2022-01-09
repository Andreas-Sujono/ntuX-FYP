import { Roles } from '../../authModule/roles/roles.decorator';
import { Controller, Get, Query } from '@nestjs/common';
import { Crud, CrudController, Override } from '@nestjsx/crud';
import { UserRole } from 'src/authModule/entities/user.entity';
import { GoalTask, TaskType } from '../entities/goalTask.entity';
import { GoalTaskService } from '../services/goalTask.entity';
import { Public } from 'src/authModule/public.decorator';
import { UserData } from 'src/authModule/user.decorator';

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
    getManyBase: {
      decorators: [Public()],
    },
    getOneBase: {
      decorators: [Public()],
    },
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

  @Override()
  @Public()
  async getMany() {
    return this.service.getAllAchievements();
  }

  @Get('user')
  async getUserAchievements(@UserData('userId') userId: number) {
    return this.service.getUserAchievements(userId);
  }

  @Get('check-achievement')
  async checkAchievement(
    @UserData('userId') userId: number,
    @Query('taskType') taskType: TaskType,
    @UserData('role') userRole: UserRole,
  ) {
    return this.service.checkGetPoint(Number(userId), userRole, taskType);
  }
}
