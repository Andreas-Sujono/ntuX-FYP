import { ForumTag } from './../entities/forumTag.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Injectable()
export class ForumTagService extends TypeOrmCrudService<ForumTag> {
  constructor(@InjectRepository(ForumTag) repo) {
    super(repo);
  }

  async getAllTags() {
    return this.repo.query(`
      SELECT forum_tag.*, sum(forum_tag_questions_forum_question."forumQuestionId") FROM forum_tag 
      left join forum_tag_questions_forum_question on forum_tag.id = forum_tag_questions_forum_question."forumTagId"
      GRUP BY forum_tag.id
    `);
  }
}
