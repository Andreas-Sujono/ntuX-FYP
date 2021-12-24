import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { CourseBatch } from '../entities/courseBatch.entity';

@Injectable()
export class CoursebatchService extends TypeOrmCrudService<CourseBatch> {
  constructor(@InjectRepository(CourseBatch) repo) {
    super(repo);
  }
}
