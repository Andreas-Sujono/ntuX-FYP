import { ForumTag } from './../entities/forumTag.entity';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Cache } from 'cache-manager';

@Injectable()
export class ForumTagService extends TypeOrmCrudService<ForumTag> {
  constructor(
    @InjectRepository(ForumTag) repo,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {
    super(repo);
  }

  async getAllTags() {
    const value = await this.cacheManager.get('tags');

    if (value) return value;

    const res = await this.repo.query(`
      SELECT forum_tag.*, count(forum_tag_questions_forum_question."forumQuestionId") FROM forum_tag 
      left join forum_tag_questions_forum_question on forum_tag.id = forum_tag_questions_forum_question."forumTagId"
      GROUP BY forum_tag.id
    `);

    await this.cacheManager.set('tags', res, { ttl: 1000 });

    return res;
  }

  async createTag(dto: Partial<ForumTag>) {
    return this.repo.save(this.repo.create(dto));
  }
}
