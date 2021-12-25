import { AuthService } from 'src/authModule/services/auth.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService extends TypeOrmCrudService<User> {
  constructor(@InjectRepository(User) repo, private authService: AuthService) {
    super(repo);
  }

  async createUser(body: User) {
    return this.authService.signUp(body, body.role);
  }
}
