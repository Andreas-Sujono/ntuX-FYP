import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { GoalTask } from '../entities/goalTask.entity';

@Injectable()
export class GoalTaskService extends TypeOrmCrudService<GoalTask> {
  constructor(@InjectRepository(GoalTask) repo) {
    super(repo);
  }
}
