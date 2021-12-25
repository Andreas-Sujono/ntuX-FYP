import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { WebsiteActivity } from '../entities/websiteActivity.entity';

@Injectable()
export class WebsiteActivityService extends TypeOrmCrudService<WebsiteActivity> {
  constructor(@InjectRepository(WebsiteActivity) repo) {
    super(repo);
  }
}
