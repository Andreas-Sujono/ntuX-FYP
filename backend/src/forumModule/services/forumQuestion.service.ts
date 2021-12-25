import { ForumQuestion } from './../entities/forumQuestion.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Injectable()
export class ForumQuestionService extends TypeOrmCrudService<ForumQuestion> {
  constructor(@InjectRepository(ForumQuestion) repo) {
    super(repo);
  }
}
