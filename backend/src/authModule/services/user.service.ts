import { AuthService } from 'src/authModule/services/auth.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { User } from '../entities/user.entity';
import { ILike, Like } from 'typeorm';

@Injectable()
export class UserService extends TypeOrmCrudService<User> {
  constructor(@InjectRepository(User) repo, private authService: AuthService) {
    super(repo);
  }

  async createUser(body: User) {
    return this.authService.signUp(body, body.role, !!body.emailVerifiesAt);
  }

  async getTopUsers() {
    return this.repo.find({
      order: {
        totalExps: 'DESC',
      },
      take: 10,
    });
  }

  async getMostActiveUsers() {
    const res = await this.repo.query(`
      select user.* from user left join student_website_activity on user.id = student_website_activity."userId" group by user.id and student_website_activity.date
      order by sum(student_website_activity."visitWithLogin") desc limit 10
    `);
    res.forEach((item) => {
      delete item.confirmationCode;
      delete item.hashedPassword;
      delete item.NRIC;
      delete item.dateOfBirth;
    });
    return res;
  }

  async searchUser(query: string) {
    if (!query) {
      const res = await this.repo.find({});
      res.forEach((item) => {
        delete item.confirmationCode;
        delete item.hashedPassword;
        delete item.NRIC;
        delete item.dateOfBirth;
      });
      return res;
    }

    const res = await this.repo.find({
      where: [
        {
          name: ILike(`%${query}%`),
        },
        {
          email: ILike(`%${query}%`),
        },
      ],
    });
    res.forEach((item) => {
      delete item.confirmationCode;
      delete item.hashedPassword;
      delete item.NRIC;
      delete item.dateOfBirth;
    });
    return res;
  }
}
