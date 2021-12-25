import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Tutor } from '../entities/tutor.entity';

@Injectable()
export class TutorService extends TypeOrmCrudService<Tutor> {
  constructor(@InjectRepository(Tutor) repo) {
    super(repo);
  }
}
