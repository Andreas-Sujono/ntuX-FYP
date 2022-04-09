import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import * as moment from 'moment-timezone';
import { StudentWebsiteActivity } from '../entities/StudentWebsiteActivity.entity';
import { WebsiteActivity } from '../entities/websiteActivity.entity';
import { User } from 'src/authModule/entities/user.entity';
import { CourseWebsiteActivity } from '../entities/courseWebsiteActivity.entity';

@Injectable()
export class CourseWebsiteActivityService extends TypeOrmCrudService<CourseWebsiteActivity> {
  constructor(
    @InjectRepository(CourseWebsiteActivity) repo,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {
    super(repo);
  }

  async getSummary(interval: 'd' | 'w' | 'm', courseId: number) {
    if (interval === 'd') {
      const res = await this.repo.query(`   
      SELECT sum(course_website_activity."visitWithLogin") as "visitWithLogin",
        date
        from course_website_activity where course_website_activity."courseId" = ${courseId}
        group by date order by date desc limit 7
      `);
      return res;
    }
    if (interval === 'w') {
      const res = await this.repo.query(`   
      SELECT sum(course_website_activity."visitWithLogin") as "visitWithLogin",
        date
        from course_website_activity where course_website_activity."courseId" = ${courseId}
        group by date order by date desc limit 49
      `);
      return res;
    }
    const res = await this.repo.query(`   
    SELECT sum(course_website_activity."visitWithLogin") as "visitWithLogin",
        date
        from course_website_activity where course_website_activity."courseId" = ${courseId}
        group by date order by date desc limit 210
      `);
    return res;
  }

  async updateWebsiteActivity(
    dto: Partial<CourseWebsiteActivity>,
    userId?: number,
  ) {
    const userDate = moment(dto.date || new Date())
      .tz('Asia/Singapore')
      .toDate();
    // .format('YYYY-MM-DD');
    //change to SG time
    const existing = await this.repo.findOne({
      date: userDate,
      course: dto.course,
    });
    if (existing)
      await this.repo.update(
        { id: existing.id },
        {
          visitWithLogin: existing.visitWithLogin + (dto.visitWithLogin || 0),
        },
      );
    else
      await this.repo.save(
        this.repo.create({
          date: userDate,
          ...dto,
        }),
      );

    return {
      success: true,
    };
  }
}
