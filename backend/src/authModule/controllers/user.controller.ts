import { Roles } from '../roles/roles.decorator';
import {
  Controller,
  Get,
  Param,
  BadRequestException,
  Query,
} from '@nestjs/common';
import {
  Crud,
  CrudController,
  CrudRequest,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@nestjsx/crud';
import { User, UserRole } from 'src/authModule/entities/user.entity';
import { UserService } from '../services/user.service';
import { Public } from '../public.decorator';
import { UserData } from '../user.decorator';
import { ILike } from 'typeorm';

@Crud({
  model: {
    type: User,
  },
  query: {
    join: {
      currentAvatar: {
        eager: true,
      },
      avatars: {
        eager: true,
      },
      courses: {
        eager: true,
      },
      premiumSetting: {
        eager: true,
      },
    },
  },
  routes: {
    only: [
      'getOneBase',
      'updateOneBase',
      'createOneBase',
      'getManyBase',
      'deleteOneBase',
    ],
    getManyBase: {
      decorators: [Public()],
    },
    getOneBase: {
      decorators: [Public()],
    },
    createOneBase: {
      decorators: [Roles(UserRole.ADMIN)],
    },
    updateOneBase: {
      decorators: [Roles(UserRole.ADMIN, UserRole.LECTURER, UserRole.STUDENT)],
    },
    deleteOneBase: {
      decorators: [Roles(UserRole.ADMIN, UserRole.LECTURER)],
    },
  },
})
@Controller('user')
export class UserController implements CrudController<User> {
  constructor(public service: UserService) {}

  @Get('all/lecturers')
  @Public()
  async getAllLecturers() {
    const res = await this.service.find({
      role: UserRole.LECTURER,
    });
    res.forEach((item) => {
      delete item.NRIC;
      delete item.dateOfBirth;
      delete item.confirmationCode;
      delete item.hashedPassword;
    });
    return res;
  }

  @Get('all/students')
  @Public()
  async getAllStudents(@Query('query') query: string) {
    query = query || '';
    const res = await this.service.find({
      where: [
        {
          role: UserRole.STUDENT,
          fullName: ILike(`%${query}%`),
        },
        {
          role: UserRole.STUDENT,
          email: ILike(`%${query}%`),
        },
      ],
    });
    res.forEach((item) => {
      delete item.NRIC;
      delete item.dateOfBirth;
      delete item.confirmationCode;
      delete item.hashedPassword;
    });
    return res;
  }

  @Override()
  async createOne(@ParsedBody() dto: User) {
    return this.service.createUser(dto);
  }

  @Override()
  @Public()
  async getMany() {
    const res = await this.service.find({
      order: {
        createdAt: 'DESC',
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

  @Get('me')
  async getMyAccount(@UserData('userId') userId: number) {
    const res = await this.service.findOne({
      where: {
        id: Number(userId),
      },
      relations: ['avatars', 'currentAvatar', 'courses', 'premiumSetting'],
    });

    delete res.confirmationCode;
    delete res.hashedPassword;
    delete res.NRIC;
    delete res.dateOfBirth;

    return res;
  }

  @Get('top')
  @Public()
  async getTopUsers() {
    return this.service.getTopUsers();
  }

  @Get('active')
  @Public()
  async getMostActiveUsers() {
    return this.service.getMostActiveUsers();
  }

  @Get('search')
  @Public()
  async searchUser(@Query('query') query: string) {
    return this.service.searchUser(query);
  }

  @Override()
  async updateOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: User,
    @UserData('userId') userId: string,
    @UserData('role') role: string,
    @Param('id') id: string,
  ) {
    if (role === UserRole.STUDENT && String(id) !== String(userId)) {
      throw new BadRequestException('You can only update your own account');
    }
    return this.service.updateOne(req, dto);
  }

  @Override()
  @Public()
  async getOne(@UserData('userId') userId: string, @Param('id') id: string) {
    const res = await this.service.findOne({
      where: {
        id,
      },
      relations: ['avatars', 'currentAvatar', 'courses', 'premiumSetting'],
    });

    delete res.confirmationCode;
    delete res.hashedPassword;
    if (userId !== id) {
      delete res.NRIC;
      delete res.dateOfBirth;
    }

    return res;
  }
}
