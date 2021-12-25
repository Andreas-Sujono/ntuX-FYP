import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Reward } from '../entities/reward.entity';

@Injectable()
export class RewardService extends TypeOrmCrudService<Reward> {
  constructor(@InjectRepository(Reward) repo) {
    super(repo);
  }
}
