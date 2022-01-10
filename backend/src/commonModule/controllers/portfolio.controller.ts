import { Roles } from '../../authModule/roles/roles.decorator';
import { Controller, Param } from '@nestjs/common';
import {
  Crud,
  CrudController,
  Override,
  ParsedRequest,
  ParsedBody,
  CrudRequest,
} from '@nestjsx/crud';
import { Portfolio } from '../entities/portfolio.entity';
import { PortfolioService } from '../services/Portfolio.service';
import { UserRole } from 'src/authModule/entities/user.entity';
import { Public } from 'src/authModule/public.decorator';
import { UserData } from 'src/authModule/user.decorator';

@Crud({
  model: {
    type: Portfolio,
  },
  routes: {
    only: ['getOneBase', 'updateOneBase', 'createOneBase', 'deleteOneBase'],
    // getManyBase: {
    //   decorators: [Public()],
    // },
    getOneBase: {
      decorators: [Public()],
    },
    createOneBase: {
      decorators: [Roles(UserRole.LECTURER, UserRole.ADMIN, UserRole.STUDENT)],
    },
    updateOneBase: {
      decorators: [Roles(UserRole.LECTURER, UserRole.ADMIN, UserRole.STUDENT)],
    },
    deleteOneBase: {
      decorators: [Roles(UserRole.LECTURER, UserRole.ADMIN, UserRole.STUDENT)],
    },
  },
})
@Controller('portfolio')
export class PortfolioController implements CrudController<Portfolio> {
  constructor(public service: PortfolioService) {}

  @Override()
  async createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: Portfolio,
    @UserData('userId') userId: number,
  ) {
    delete dto.id;
    dto.user = userId as any;
    const exist = await this.service.findOne({
      where: {
        user: userId,
      },
    });

    if (exist) return this.service.updatePortfolio(exist.id, dto);

    return this.service.createOne(req, dto);
  }

  @Override()
  async getMany(req: CrudRequest, @UserData('userId') userId: number) {
    return this.service.getPorfolio(userId);
  }

  @Override()
  @Public()
  async getOne(req: CrudRequest, @Param('id') id: number) {
    return this.service.getPorfolio(id);
  }
}
