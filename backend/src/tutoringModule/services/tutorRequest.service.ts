import { TutorRequest } from './../entities/tutorRequest.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Injectable()
export class TutorRequestService extends TypeOrmCrudService<TutorRequest> {
  constructor(@InjectRepository(TutorRequest) repo) {
    super(repo);
  }
}
