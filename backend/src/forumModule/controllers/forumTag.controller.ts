import { ApiTags } from '@nestjs/swagger';
import { ForumTag } from './../entities/forumTag.entity';
import { Roles } from '../../authModule/roles/roles.decorator';
import { Controller } from '@nestjs/common';
import {
  Crud,
  CrudController,
  CrudRequest,
  GetManyDefaultResponse,
  Override,
} from '@nestjsx/crud';
import { UserRole } from 'src/authModule/entities/user.entity';
import { ForumTagService } from '../services/forumTag.service';
import { Public } from 'src/authModule/public.decorator';

@Crud({
  model: {
    type: ForumTag,
  },
  routes: {
    only: [
      'getOneBase',
      'updateOneBase',
      'createOneBase',
      'getManyBase',
      'deleteOneBase',
    ],
    createOneBase: {
      decorators: [Roles(UserRole.LECTURER, UserRole.ADMIN)],
    },
    updateOneBase: {
      decorators: [Roles(UserRole.LECTURER, UserRole.ADMIN)],
    },
    deleteOneBase: {
      decorators: [Roles(UserRole.LECTURER, UserRole.ADMIN)],
    },
  },
})
@ApiTags('Forum Tag')
@Controller('forum-tag')
export class ForumTagController implements CrudController<ForumTag> {
  constructor(public service: ForumTagService) {}

  @Override()
  @Public()
  async getMany() {
    return await this.service.getAllTags();
  }
}
