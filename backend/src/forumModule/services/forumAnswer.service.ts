import { ForumAnswer } from './../entities/forumAnswer.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Injectable()
export class ForumAnswerService extends TypeOrmCrudService<ForumAnswer> {
  constructor(@InjectRepository(ForumAnswer) repo) {
    super(repo);
  }
}
