import { Roles } from '../../authModule/roles/roles.decorator';
import { Controller, Get, Patch, Query } from '@nestjs/common';
import { Crud, CrudController, Override } from '@nestjsx/crud';
import { UserRole } from 'src/authModule/entities/user.entity';
import { GoalTask, TaskType } from '../entities/goalTask.entity';
import { GoalTaskService } from '../services/goalTask.entity';
import { Public } from 'src/authModule/public.decorator';
import { UserData } from 'src/authModule/user.decorator';
import { Notification } from '../entities/notification.entity';
import { NotificationService } from '../services/notification.service';

@Crud({
  model: {
    type: Notification,
  },
  routes: {
    only: [
      'getOneBase',
      'updateOneBase',
      // 'createOneBase',
      'getManyBase',
      // 'deleteOneBase',
    ],
    createOneBase: {
      decorators: [Roles(UserRole.LECTURER, UserRole.ADMIN)],
    },
    updateOneBase: {
      decorators: [Roles(UserRole.LECTURER, UserRole.ADMIN, UserRole.STUDENT)],
    },
    deleteOneBase: {
      decorators: [Roles(UserRole.LECTURER, UserRole.ADMIN)],
    },
  },
})
@Controller('notifications')
export class NotificationController implements CrudController<Notification> {
  constructor(public service: NotificationService) {}

  @Override()
  async getMany(@UserData('userId') userId: number) {
    return this.service.getManyNotification(userId);
  }

  @Patch('update-view')
  async updateViewNotification(
    @UserData('userId') userId: number,
    @Query('batchId') batchId: number,
    @Query('courseId') courseId: number,
  ) {
    return this.service.updateNotificationView(userId, batchId, courseId);
  }
}
