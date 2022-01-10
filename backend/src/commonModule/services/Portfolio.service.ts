import { User } from 'src/authModule/entities/user.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Portfolio } from '../entities/portfolio.entity';
import { Repository } from 'typeorm';
import { CourseService } from 'src/courseModule/services/course.service';
import { WebsiteActivityService } from './websiteActivity.service';

@Injectable()
export class PortfolioService extends TypeOrmCrudService<Portfolio> {
  constructor(
    @InjectRepository(Portfolio) repo,
    @InjectRepository(User) private userRepo: Repository<User>,
    private courseService: CourseService,
    private websiteActivityService: WebsiteActivityService,
  ) {
    super(repo);
  }

  async updatePortfolio(id: number, dto: Portfolio) {
    return this.repo.update(id, dto);
  }

  async getPorfolio(userId: number) {
    const [user, registeredCourses, studentSummary] = await Promise.all([
      this.userRepo.findOne({
        where: {
          id: userId,
        },
        relations: ['currentAvatar', 'premiumSetting', 'portfolio'],
      }),
      this.courseService.getStudentCourses(userId as any),
      this.websiteActivityService.getStudentSummary(undefined, userId as any),
    ]);

    if (!user) throw new NotFoundException('User not found');

    delete user.confirmationCode;
    delete user.hashedPassword;
    delete user.NRIC;
    delete user.dateOfBirth;
    return {
      user,
      registeredCourses,
      studentSummary,
    };
  }
}
