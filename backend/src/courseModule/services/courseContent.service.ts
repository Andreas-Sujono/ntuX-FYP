import { CourseContent } from './../entities/courseContent.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Injectable()
export class CourseContentService extends TypeOrmCrudService<CourseContent> {
  constructor(@InjectRepository(CourseContent) repo) {
    super(repo);
  }

  async createOrUpdateCourseContent(courseContent: CourseContent) {
    return this.repo.save(courseContent);
  }
}
