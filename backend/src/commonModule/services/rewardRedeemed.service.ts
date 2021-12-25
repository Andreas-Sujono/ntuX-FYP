import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { RewardRedeemed } from '../entities/rewardRedeemed.entity';

@Injectable()
export class RewardRedeemedService extends TypeOrmCrudService<RewardRedeemed> {
  constructor(@InjectRepository(RewardRedeemed) repo) {
    super(repo);
  }
}
