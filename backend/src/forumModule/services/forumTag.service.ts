import { ForumTag } from './../entities/ForumTag.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Injectable()
export class ForumTagService extends TypeOrmCrudService<ForumTag> {
  constructor(@InjectRepository(ForumTag) repo) {
    super(repo);
  }
}
