import { Roles } from '../../authModule/roles/roles.decorator';
import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Portfolio } from '../entities/portfolio.entity';
import { PortfolioService } from '../services/Portfolio.service';
import { UserRole } from 'src/authModule/entities/user.entity';
import { Public } from 'src/authModule/public.decorator';

@Crud({
  model: {
    type: Portfolio,
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
}
