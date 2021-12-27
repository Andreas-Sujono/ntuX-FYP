import { ForumAnswer } from './../../forumModule/entities/forumAnswer.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from 'src/authModule/entities/user.entity';
import { ForumQuestion } from 'src/forumModule/entities/forumQuestion.entity';
import { Tutor } from 'src/tutoringModule/entities/tutor.entity';
import { IsNull, Repository } from 'typeorm';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Tutor) private tutorRepo: Repository<Tutor>,
    @InjectRepository(ForumQuestion)
    private forumQuestionRepo: Repository<ForumQuestion>,
    @InjectRepository(ForumAnswer)
    private forumAnswerRepo: Repository<ForumAnswer>,
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
}
