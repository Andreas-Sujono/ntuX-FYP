import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { WebsiteActivity } from '../entities/websiteActivity.entity';

@Injectable()
export class WebsiteActivityService extends TypeOrmCrudService<WebsiteActivity> {
  constructor(@InjectRepository(WebsiteActivity) repo) {
    super(repo);
  }

  async getSummary(interval: 'd' | 'w' | 'm') {
    if (interval === 'd') {
      const res = await this.repo.query(`   
        SELECT (website_activity."visitWithoutLogin") as visitWithoutLogin, 
        (website_activity."visitWithLogin") as visitWithLogin,
        (website_activity."totalQuestion") as totalQuestion,
        (website_activity."totalAnswer") as totalAnswer,
        (website_activity."totalTutorRequest") as totalTutorRequest,
        (website_activity."totalTutorRequestAccepted") as totalTutorRequestAccepted
        from website_activity group by date order by date desc limit 7
      `);
      return res[0];
    }
    if (interval === 'w') {
      const res = await this.repo.query(`   
        SELECT (website_activity."visitWithoutLogin") as visitWithoutLogin, 
        (website_activity."visitWithLogin") as visitWithLogin,
        (website_activity."totalQuestion") as totalQuestion,
        (website_activity."totalAnswer") as totalAnswer,
        (website_activity."totalTutorRequest") as totalTutorRequest,
        (website_activity."totalTutorRequestAccepted") as totalTutorRequestAccepted
        from website_activity group by date order by date desc limit 49
      `);
      return res[0];
    }
    const res = await this.repo.query(`   
        SELECT (website_activity."visitWithoutLogin") as visitWithoutLogin, 
        (website_activity."visitWithLogin") as visitWithLogin,
        (website_activity."totalQuestion") as totalQuestion,
        (website_activity."totalAnswer") as totalAnswer,
        (website_activity."totalTutorRequest") as totalTutorRequest,
        (website_activity."totalTutorRequestAccepted") as totalTutorRequestAccepted
        from website_activity group by date order by date desc limit 210
      `);
    return res[0];
  }

  async getDashboardData() {
    //total user
    //total course
    //total question
    //total tutor
  }
}
