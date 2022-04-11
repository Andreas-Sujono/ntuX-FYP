import { UserRole } from './../entities/user.entity';
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
    const res = await this.repo.find({
      where: {
        role: UserRole.STUDENT,
      },
      order: {
        totalExps: 'DESC',
      },
      relations: ['currentAvatar'],
      take: 10,
    });
    res.forEach((item) => {
      delete item.confirmationCode;
      delete item.hashedPassword;
      delete item.NRIC;
      delete item.dateOfBirth;
    });
    return res;
  }

  async getMostActiveUsers() {
    const res = await this.repo.query(`
      select "user".*, avatar."imageUrl" as "avatarImageUrl" from "user" 
      left join student_website_activity on "user".id = student_website_activity."userId" 
      left join avatar on "user"."currentAvatarId" = avatar.id
      where "user".role = '${UserRole.STUDENT}'
      group by "user".id, avatar."imageUrl"
      order by CAST((COALESCE(sum(student_website_activity."visitWithLogin"),'0')) AS INTEGER) desc limit 10
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
      const res = await this.repo.find({
        where: {
          role: UserRole.STUDENT,
        },
      });
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
          role: UserRole.STUDENT,
        },
        {
          email: ILike(`%${query}%`),
          role: UserRole.STUDENT,
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
