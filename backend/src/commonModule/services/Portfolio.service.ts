import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Portfolio } from '../entities/portfolio.entity';

@Injectable()
export class PortfolioService extends TypeOrmCrudService<Portfolio> {
  constructor(@InjectRepository(Portfolio) repo) {
    super(repo);
  }
}
