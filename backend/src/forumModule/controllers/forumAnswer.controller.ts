import { ForumAnswerService } from './../services/forumAnswer.service';
import { ForumAnswer } from './../entities/forumAnswer.entity';
import { Roles } from '../../authModule/roles/roles.decorator';
import { Controller } from '@nestjs/common';
import {
  Crud,
  CrudController,
  CrudRequest,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@nestjsx/crud';
import { UserRole } from 'src/authModule/entities/user.entity';
import { UserData } from 'src/authModule/user.decorator';

@Crud({
  model: {
    type: ForumAnswer,
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
@Controller('forum-answer')
export class ForumAnswerController implements CrudController<ForumAnswer> {
  constructor(public service: ForumAnswerService) {}

  @Override()
  async createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: ForumAnswer,
    @UserData('userId') userId: number,
  ) {
    delete dto.id;
    dto.user = userId as any;
    if (dto.parentAnswer) {
      dto.question = null;
    }
    return this.service.createOne(req, dto);
  }
}
