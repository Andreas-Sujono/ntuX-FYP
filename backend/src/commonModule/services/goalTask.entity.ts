import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { GoalTask } from '../entities/goalTask.entity';

export enum GoalTaskType {
  LOGIN_FIRST_TIME = 'LOGIN_FIRST_TIME',
  UPDATE_PROFILE_FIRST_TIME = 'UPDATE_PROFILE_FIRST_TIME',
  BUY_AVATAR_FIRST_TIME = 'BUY_AVATAR_FIRST_TIME',
  REDEEM_REWARD_FIRST_TIME = 'REDEEM_REWARD_FIRST_TIME',
  LEVEL_UP = 'LEVEL_UP',
  FINISH_COURSE = 'FINISH_COURSE',
}

@Injectable()
export class GoalTaskService extends TypeOrmCrudService<GoalTask> {
  constructor(@InjectRepository(GoalTask) repo) {
    super(repo);
  }

  async checkGetPoint(type: GoalTaskType, userId: number) {
    if (type === GoalTaskType.LOGIN_FIRST_TIME) {
      const goalTask = await this.repo.findOne({
        where: {
          type,
          userId,
        },
      });
      if (goalTask) {
        return false;
      }
      return true;
    }
  }
}
