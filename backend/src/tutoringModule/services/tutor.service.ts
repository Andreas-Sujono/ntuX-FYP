import { UserRole } from './../../authModule/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { CourseService } from 'src/courseModule/services/course.service';
import { ILike, Repository } from 'typeorm';
import { Tutor } from '../entities/tutor.entity';
import { TutorReview } from '../entities/tutorReview.entity';

@Injectable()
export class TutorService extends TypeOrmCrudService<Tutor> {
  constructor(
    @InjectRepository(Tutor) repo,
    @InjectRepository(TutorReview)
    private tutorReviewRepo: Repository<TutorReview>,
    private courseService: CourseService,
  ) {
    super(repo);
  }

  async searchTutor(query: any) {
    const res = await this.repo.find({
      where: {
        user: {
          fullName: ILike(`%${query}%`),
          role: UserRole.STUDENT,
        },
        // 'user.fullName': ILike(`%${query}%`),
        // 'user.role': UserRole.STUDENT,
        isActive: true,
      },
      relations: ['user', 'courses'],
    });
    res.forEach((item) => {
      delete item.user.confirmationCode;
      delete item.user.hashedPassword;
      delete item.user.NRIC;
      delete item.user.dateOfBirth;
    });
    return res;
  }

  async updateTutor(userId: number, dto: Partial<Tutor>) {
    return this.repo.update({ user: userId as any }, dto);
  }

  async checkSelfTutor(userId: number) {
    const courseUsers = await this.courseService.getCompletedCourse(userId);
    const tutorNow = await this.repo.findOne({
      where: {
        user: userId,
      },
      relations: ['courses'],
    });

    //not qualified as tutor
    if (!courseUsers.length)
      return {
        isTutor: false,
        courses: [],
      };

    if (!tutorNow) {
      const res = await this.repo.save({
        user: userId as any,
        isActive: false,
        courses: courseUsers
          .map((item) => item.course?.id)
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
        .map((item) => item.course?.id)
        .map((item) => ({ id: item })) as any,
    });

    return {
      ...res,
      isTutor: true,
      courses: courseUsers.map((item) => item.course),
    };
  }

  async getAllReview(tutorId: number) {
    return this.tutorReviewRepo.find({
      where: {
        tutor: tutorId,
      },
      relations: ['user', 'tutor'],
      order: {
        createdAt: 'DESC',
      },
    });
  }
}
