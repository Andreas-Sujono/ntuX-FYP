import { ForumAnswer } from './../../forumModule/entities/forumAnswer.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from 'src/authModule/entities/user.entity';
import { ForumQuestion } from 'src/forumModule/entities/forumQuestion.entity';
import { Tutor } from 'src/tutoringModule/entities/tutor.entity';
import { IsNull, MoreThan, Repository } from 'typeorm';
import { WebsiteActivityService } from './websiteActivity.service';
import { CourseService } from 'src/courseModule/services/course.service';
import * as data from './data.json';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Tutor) private tutorRepo: Repository<Tutor>,
    @InjectRepository(ForumQuestion)
    private forumQuestionRepo: Repository<ForumQuestion>,
    @InjectRepository(ForumAnswer)
    private forumAnswerRepo: Repository<ForumAnswer>,
    private websiteActivityService: WebsiteActivityService,
    private courseService: CourseService,
  ) {}

  async getSummary() {
    const [
      totalLecturers,
      totalStudents,
      totalAdmins,
      totalTutors,
      totalQuestions,
      totalAnswers,
    ] = await Promise.all([
      this.userRepo.count({
        role: UserRole.LECTURER,
      }),
      this.userRepo.count({
        role: UserRole.STUDENT,
      }),
      this.userRepo.count({
        role: UserRole.ADMIN,
      }),
      this.tutorRepo.count({
        isActive: true,
      }),
      this.forumQuestionRepo.count({
        parentQuestion: IsNull(),
      }),
      this.forumAnswerRepo.count({
        parentAnswer: IsNull(),
      }),
    ]);

    return {
      totalUser: totalLecturers + totalStudents + totalAdmins,
      totalLecturers,
      totalStudents,
      totalAdmins,
      totalTutors,
      totalQuestions,
      totalAnswers,
    };
  }

  async getUserSummary(userId: string) {
    const [activitySummary, user, userCourses] = await Promise.all([
      this.websiteActivityService.getStudentSummary('m', userId),
      this.userRepo.findOne({ id: userId as any }),
      this.courseService.getStudentCourses(userId),
    ]);

    return {
      ...user,
      activitySummary,
      courses: userCourses,
    };
  }

  async testInsertData() {
    // const allUsers = await this.userRepo.find({});
    // //create tutor
    // return await Promise.all(
    //   allUsers.map((item) => {
    //     if (item.role === null)
    //       this.tutorRepo.save({
    //         ...item,
    //         role: 'STUDENT',
    //       });
    //   }),
    // );
    // return await Promise.all(
    //   data.map((item) =>
    //     this.userRepo.save(
    //       this.userRepo.create({
    //         ...item,
    //         nationality: 'American',
    //         citizenship: 'american',
    //         emailVerifiesAt: new Date(),
    //         hashedPassword:
    //           '$2a$10$1GJCwdfl1MqIZRtNiUvMEODhBGkcm3vDORvs8HEKyCkDdcFxmKlCe',
    //       }),
    //     ),
    //   ),
    // );
  }
}
