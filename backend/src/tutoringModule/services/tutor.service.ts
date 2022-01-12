import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { CourseService } from 'src/courseModule/services/course.service';
import { Tutor } from '../entities/tutor.entity';

@Injectable()
export class TutorService extends TypeOrmCrudService<Tutor> {
  constructor(
    @InjectRepository(Tutor) repo,
    private courseService: CourseService,
  ) {
    super(repo);
  }

  async checkSelfTutor(userId: number) {
    const courseUsers = await this.courseService.getCompletedCourse(userId);
    const tutorNow = await this.repo.findOne({
      where: {
        id: userId,
      },
      relations: ['courses'],
    });

    //not qualified as tutor
    if (courseUsers.length)
      return {
        isTutor: false,
        courses: [],
      };

    if (!tutorNow) {
      const res = await this.repo.save({
        user: userId as any,
        isActive: false,
        courses: courseUsers
          .filter((item) => item.course?.id)
          .map((item) => ({ id: item })) as any,
      });
      return {
        ...res,
        isTutor: true,
        courses: courseUsers.map((item) => item.course),
      };
    }

    const res = await this.repo.save({
      ...tutorNow,
      courses: courseUsers
        .filter((item) => item.course?.id)
        .map((item) => ({ id: item })) as any,
    });

    return {
      ...res,
      isTutor: true,
      courses: courseUsers.map((item) => item.course),
    };
  }
}
