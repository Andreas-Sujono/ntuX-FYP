import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import * as moment from 'moment-timezone';
import { StudentWebsiteActivity } from '../entities/StudentWebsiteActivity.entity';
import { WebsiteActivity } from '../entities/websiteActivity.entity';

@Injectable()
export class WebsiteActivityService extends TypeOrmCrudService<WebsiteActivity> {
  constructor(
    @InjectRepository(WebsiteActivity) repo,
    @InjectRepository(StudentWebsiteActivity)
    private studentWebsiteActivityRepo: Repository<StudentWebsiteActivity>,
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
        from student_website_activity group by date order by date desc limit 7 WHERE student_website_activity."userId" = ${userId}
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
        from student_website_activity group by date order by date desc limit 49 WHERE student_website_activity."userId" = ${userId}
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
        from student_website_activity group by date order by date desc limit 210 WHERE student_website_activity."userId" = ${userId}
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

  async updateWebsiteActivity(dto: WebsiteActivity, userId?: number) {
    const userDate = moment(dto.date || new Date())
      .tz('Asia/Singapore')
      .format('YYYY-MM-DD');
    //change to SG time
    const existing = await this.repo.findOne({
      date: userDate,
    });
    if (existing)
      await this.repo.update(existing, {
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
      });
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
      });
      if (existing2)
        await this.studentWebsiteActivityRepo.update(existing, {
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
        });
      else
        await this.studentWebsiteActivityRepo.save(
          this.studentWebsiteActivityRepo.create({
            date: userDate,
            ...dto,
          }),
        );
    }

    return {
      success: true,
    };
  }
}
