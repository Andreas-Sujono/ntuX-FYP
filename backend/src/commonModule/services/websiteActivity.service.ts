import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import * as moment from 'moment-timezone';
import { StudentWebsiteActivity } from '../entities/StudentWebsiteActivity.entity';
import { WebsiteActivity } from '../entities/websiteActivity.entity';
import { User } from 'src/authModule/entities/user.entity';

@Injectable()
export class WebsiteActivityService extends TypeOrmCrudService<WebsiteActivity> {
  constructor(
    @InjectRepository(WebsiteActivity) repo,
    @InjectRepository(StudentWebsiteActivity)
    private studentWebsiteActivityRepo: Repository<StudentWebsiteActivity>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {
    super(repo);
  }

  async getStudentSummary(interval: 'd' | 'w' | 'm', userId?: string) {
    if (interval === 'd') {
      const res = await this.repo.query(`   
        SELECT sum(student_website_activity."visitWithoutLogin") as "visitWithoutLogin", 
        sum(student_website_activity."visitWithLogin") as "visitWithLogin",
        sum(student_website_activity."totalQuestion") as "totalQuestion",
        sum(student_website_activity."totalAnswer") as "totalAnswer",
        sum(student_website_activity."totalTutorRequest") as "totalTutorRequest",
        sum(student_website_activity."totalTutorRequestAccepted") as "totalTutorRequestAccepted",
        date
        from student_website_activity  WHERE student_website_activity."userId" = ${userId} group by date order by date desc limit 7
      `);
      return res;
    }
    if (interval === 'w') {
      const res = await this.repo.query(`   
        SELECT sum(student_website_activity."visitWithoutLogin") as "visitWithoutLogin", 
        sum(student_website_activity."visitWithLogin") as "visitWithLogin",
        sum(student_website_activity."totalQuestion") as "totalQuestion",
        sum(student_website_activity."totalAnswer") as "totalAnswer",
        sum(student_website_activity."totalTutorRequest") as "totalTutorRequest",
        sum(student_website_activity."totalTutorRequestAccepted") as "totalTutorRequestAccepted",
        date
        from student_website_activity  WHERE student_website_activity."userId" = ${userId} group by date order by date desc limit 49
      `);
      return res;
    }
    const res = await this.repo.query(`   
        SELECT sum(student_website_activity."visitWithoutLogin") as "visitWithoutLogin", 
        sum(student_website_activity."visitWithLogin") as "visitWithLogin",
        sum(student_website_activity."totalQuestion") as "totalQuestion",
        sum(student_website_activity."totalAnswer") as "totalAnswer",
        sum(student_website_activity."totalTutorRequest") as "totalTutorRequest",
        sum(student_website_activity."totalTutorRequestAccepted") as "totalTutorRequestAccepted",
        date
        from student_website_activity WHERE student_website_activity."userId" = ${userId} group by date order by date desc limit 210
      `);
    return res;
  }

  async getSummary(interval: 'd' | 'w' | 'm') {
    if (interval === 'd') {
      const res = await this.repo.query(`   
        SELECT sum(website_activity."visitWithoutLogin") as "visitWithoutLogin", 
        sum(website_activity."visitWithLogin") as "visitWithLogin",
        sum(website_activity."totalQuestion") as "totalQuestion",
        sum(website_activity."totalAnswer") as "totalAnswer",
        sum(website_activity."totalTutorRequest") as "totalTutorRequest",
        sum(website_activity."totalTutorRequestAccepted") as "totalTutorRequestAccepted",
        date
        from website_activity group by date order by date desc limit 7
      `);
      return res;
    }
    if (interval === 'w') {
      const res = await this.repo.query(`   
        SELECT sum(website_activity."visitWithoutLogin") as "visitWithoutLogin", 
        sum(website_activity."visitWithLogin") as "visitWithLogin",
        sum(website_activity."totalQuestion") as "totalQuestion",
        sum(website_activity."totalAnswer") as "totalAnswer",
        sum(website_activity."totalTutorRequest") as "totalTutorRequest",
        sum(website_activity."totalTutorRequestAccepted") as "totalTutorRequestAccepted",
        date
        from website_activity group by date order by date desc limit 49
      `);
      return res;
    }
    const res = await this.repo.query(`   
        SELECT sum(website_activity."visitWithoutLogin") as "visitWithoutLogin", 
        sum(website_activity."visitWithLogin") as "visitWithLogin",
        sum(website_activity."totalQuestion") as "totalQuestion",
        sum(website_activity."totalAnswer") as "totalAnswer",
        sum(website_activity."totalTutorRequest") as "totalTutorRequest",
        sum(website_activity."totalTutorRequestAccepted") as "totalTutorRequestAccepted",
        date
        from website_activity group by date order by date desc limit 210
      `);
    return res;
  }

  async updateWebsiteActivity(dto: Partial<WebsiteActivity>, userId?: number) {
    const userDate = moment(dto.date || new Date())
      .tz('Asia/Singapore')
      .toDate();
    // .format('YYYY-MM-DD');
    //change to SG time
    const existing = await this.repo.findOne({
      date: userDate,
    });
    if (existing)
      await this.repo.update(
        { id: existing.id },
        {
          visitWithLogin: existing.visitWithLogin + (dto.visitWithLogin || 0),
          visitWithoutLogin:
            existing.visitWithoutLogin + (dto.visitWithoutLogin || 0),
          totalQuestion: existing.totalQuestion + (dto.totalQuestion || 0),
          totalAnswer: existing.totalAnswer + (dto.totalAnswer || 0),
          totalTutorRequest:
            existing.totalTutorRequest + (dto.totalTutorRequest || 0),
          totalTutorRequestAccepted:
            existing.totalTutorRequestAccepted +
            (dto.totalTutorRequestAccepted || 0),
        },
      );
    else
      await this.repo.save(
        this.repo.create({
          date: userDate,
          ...dto,
        }),
      );

    if (userId) {
      const existing2 = await this.studentWebsiteActivityRepo.findOne({
        date: userDate,
        user: userId as any,
      });
      if (existing2)
        await this.studentWebsiteActivityRepo.update(
          { id: existing2.id },
          {
            visitWithLogin:
              existing2.visitWithLogin + (dto.visitWithLogin || 0),
            visitWithoutLogin:
              existing2.visitWithoutLogin + (dto.visitWithoutLogin || 0),
            totalQuestion: existing2.totalQuestion + (dto.totalQuestion || 0),
            totalAnswer: existing2.totalAnswer + (dto.totalAnswer || 0),
            totalTutorRequest:
              existing2.totalTutorRequest + (dto.totalTutorRequest || 0),
            totalTutorRequestAccepted:
              existing2.totalTutorRequestAccepted +
              (dto.totalTutorRequestAccepted || 0),
          },
        );
      else
        await this.studentWebsiteActivityRepo.save(
          this.studentWebsiteActivityRepo.create({
            date: userDate,
            user: userId as any,
            ...dto,
          }),
        );
    }

    if (userId) {
      if (dto.totalQuestion) {
        this.updateExpsAndPoint(userId, 10, 10);
      }
      if (dto.totalAnswer) {
        this.updateExpsAndPoint(userId, 20, 15);
      }
      if (dto.totalTutorRequest) {
        this.updateExpsAndPoint(userId, 30, 20);
      }
      if (dto.totalTutorRequestAccepted) {
        this.updateExpsAndPoint(userId, 30, 30);
      }
    }

    return {
      success: true,
    };
  }

  async updateExpsAndPoint(userId: number, exps: number, point: number) {
    const user = await this.userRepo.findOne(userId);
    user.totalExps += exps;
    user.totalPoints += point;
    await this.userRepo.save(user);
  }
}
