import { UserRole } from 'src/authModule/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { CourseAnnouncement } from '../entities/courseAnnouncement.entity';
import { IsNull } from 'typeorm';

@Injectable()
export class CourseAnnouncementService extends TypeOrmCrudService<CourseAnnouncement> {
  constructor(@InjectRepository(CourseAnnouncement) repo) {
    super(repo);
  }

  async getCourseAnnouncements(courseId: string, batchId: string) {
    if (batchId)
      return await this.repo.find({
        where: [
          {
            course: courseId,
            courseBatch: batchId,
            status: 'PUBLISHED',
          },
          {
            course: courseId,
            courseBatch: IsNull(),
            status: 'PUBLISHED',
          },
        ],
        relations: ['course', 'courseBatch'],
        order: {
          createdAt: 'DESC',
        },
      });

    return await this.repo.find({
      where: [
        {
          course: courseId,
        },
      ],
      relations: ['course', 'courseBatch'],
      order: {
        createdAt: 'DESC',
      },
    });
  }
}
