import { ForumTag } from './../entities/ForumTag.entity';
import { ForumQuestion } from '../entities/forumQuestion.entity';
import { Roles } from '../../authModule/roles/roles.decorator';
import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { UserRole } from 'src/authModule/entities/user.entity';
import { ForumTagService } from '../services/forumTag.service';

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
@Controller('forum-tag')
export class ForumTagController implements CrudController<ForumTag> {
  constructor(public service: ForumTagService) {}
}
