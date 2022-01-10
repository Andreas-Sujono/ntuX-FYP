import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { User } from 'src/authModule/entities/user.entity';
import { UserRole } from 'src/authModule/roles/roles.enum';
import { ForumAnswer } from 'src/forumModule/entities/forumAnswer.entity';
import { ForumQuestion } from 'src/forumModule/entities/forumQuestion.entity';
import { IsNull, Repository } from 'typeorm';
import { GoalTask, TaskType } from '../entities/goalTask.entity';
import { RewardRedeemed } from '../entities/rewardRedeemed.entity';

@Injectable()
export class GoalTaskService extends TypeOrmCrudService<GoalTask> {
  constructor(
    @InjectRepository(GoalTask) repo,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(ForumQuestion)
    private forumQuestionRepo: Repository<ForumQuestion>,
    @InjectRepository(ForumAnswer)
    private forumAnswerRepo: Repository<ForumAnswer>,
    @InjectRepository(RewardRedeemed)
    private rewardRedeemedRepo: Repository<RewardRedeemed>,
  ) {
    super(repo);
  }

  async checkGetPoint(userId: number, userRole: UserRole, taskType: TaskType) {
    if (userRole !== UserRole.STUDENT) return null;

    const tasks = await this.repo.find({ taskType });

    if (taskType === TaskType.PROFILE_LOGIN) {
      const user = await this.userRepo.findOne({ id: userId });
      if (user.lastLoginAt !== null) return null;

      this.userRepo.update({ id: userId }, { lastLoginAt: new Date() });
      return {
        task: tasks[0],
        getPoints: true,
        getExps: true,
      };
    }

    if (taskType === TaskType.PROFILE_UPDATE) {
      const user = await this.userRepo.findOne({ id: userId });
      if (user.updatedAt.getTime() === user.createdAt.getTime()) return null;

      this.userRepo.update({ id: userId }, { updatedAt: new Date() });
      return {
        task: tasks[0],
        getPoints: true,
        getExps: true,
      };
    }

    if (taskType === TaskType.FORUM_ASK_QUESTION) {
      const questionAskedCount = await this.forumQuestionRepo.count({
        user: userId as any,
        parentQuestion: IsNull(),
      });
      const totalQuestionCount = questionAskedCount + 1;

      for (const task of tasks) {
        if (task.quantity > totalQuestionCount) break;
        if (task.quantity === totalQuestionCount) {
          return {
            task,
            getPoints: true,
            getExps: true,
          };
        }
      }
    }

    if (taskType === TaskType.FORUM_ANSWER_QUESTION) {
      const answerCount = await this.forumAnswerRepo.count({
        user: userId as any,
        parentAnswer: IsNull(),
      });
      const totalCount = answerCount + 1;

      for (const task of tasks) {
        if (task.quantity > totalCount) break;
        if (task.quantity === totalCount) {
          return {
            task,
            getPoints: true,
            getExps: true,
          };
        }
      }
    }

    if (taskType === TaskType.REWARD_REDEEM) {
      const countBefore = await this.rewardRedeemedRepo.count({
        user: userId as any,
      });
      const totalCount = countBefore + 1;

      for (const task of tasks) {
        if (task.quantity > totalCount) break;
        if (task.quantity === totalCount) {
          return {
            task,
            getPoints: true,
            getExps: true,
          };
        }
      }
    }

    if (taskType === TaskType.REWARD_BUY_AVATAR) {
      const user = await this.userRepo.findOne({
        where: {
          id: userId,
        },
        relations: ['avatars'],
      });
      const totalCount = user?.avatars?.length + 1 || 1;

      for (const task of tasks) {
        if (task.quantity > totalCount) break;
        if (task.quantity === totalCount) {
          return {
            task,
            getPoints: true,
            getExps: true,
          };
        }
      }
    }
    return null;
  }

  async getUserAchievements(userId: number) {
    const achievementOwned = await this.repo.query(`
      SELECT goal_task.*
      from goal_task_users_user left join "goal_task" on "goal_task_users_user"."goalTaskId" = goal_task."id"
      where "goal_task_users_user"."userId" = ${userId}    
    `);
    const achievementOwnedIds = new Set(
      achievementOwned.map((item) => item.id),
    );
    const allAchievements = await this.getAllAchievements();
    const nextAchievements: any = [];

    allAchievements.forEach((item) => {
      const types = item.types;
      let isIncluded = false;
      types.forEach((type) => {
        if (!achievementOwnedIds.has(type.id) && !isIncluded) {
          nextAchievements.push(type);
          isIncluded = true;
        }
      });
    });

    return {
      achievementOwned,
      nextAchievements,
    };
  }

  async getAllAchievements() {
    const res = await this.repo.query(`
      SELECT "taskType", json_agg(json_build_object(
        'id', id,
        'level',level, 'quantity', quantity, 'name', name,
        'points', points, 'exps', exps, 'image', image
      )) as types
      from goal_task group by goal_task."taskType"
    `);

    return res;
  }
}
