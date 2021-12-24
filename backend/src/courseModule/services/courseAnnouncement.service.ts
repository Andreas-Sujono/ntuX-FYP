import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { CourseAnnouncement } from '../entities/courseAnnouncement.entity';

@Injectable()
export class CourseAnnouncementService extends TypeOrmCrudService<CourseAnnouncement> {
  constructor(@InjectRepository(CourseAnnouncement) repo) {
    super(repo);
  }
}
