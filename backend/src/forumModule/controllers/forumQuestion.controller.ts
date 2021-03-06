import { ForumQuestion } from './../entities/forumQuestion.entity';
import { Roles } from '../../authModule/roles/roles.decorator';
import { Controller, Get, Query, Param } from '@nestjs/common';
import {
  Crud,
  CrudController,
  CrudRequest,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@nestjsx/crud';
import { UserRole } from 'src/authModule/entities/user.entity';
import { ForumQuestionService } from '../services/forumQuestion.service';
import { Public } from 'src/authModule/public.decorator';
import { UserData } from 'src/authModule/user.decorator';
import { WebsiteActivityService } from 'src/commonModule/services/websiteActivity.service';
import { ApiTags } from '@nestjs/swagger';

@Crud({
  model: {
    type: ForumQuestion,
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
@ApiTags('Forum Question')
@Controller('forum-question')
export class ForumQuestionController implements CrudController<ForumQuestion> {
  constructor(
    public service: ForumQuestionService,
    public websiteActivityService: WebsiteActivityService,
  ) {}

  @Override()
  async createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: ForumQuestion,
    @UserData('userId') userId: number,
  ) {
    delete dto.id;
    dto.user = userId as any;
    if (!dto.parentQuestion) {
      //create activity
      this.websiteActivityService.updateWebsiteActivity(
        {
          totalQuestion: 1,
        },
        userId,
      );
    }
    return this.service.createOne(req, dto);
  }

  @Override()
  @Public()
  async getMany(
    @Query('tagId') tagId: number,
    @Query('page') page = 1,
    @Query('limit') limit = 25,
    @Query('query') query: string,
  ) {
    return this.service.getManyQuestion(page, limit, tagId, query);
  }

  @Get('unanswered')
  @Public()
  async getUnansweredQuestions(
    @Query('page') page = 1,
    @Query('limit') limit = 25,
    @Query('query') query: string,
  ) {
    return this.service.getUnansweredQuestions(page, limit, query);
  }

  @Get('me')
  async getMyQuestions(
    @Query('page') page = 1,
    @Query('limit') limit = 25,
    @UserData('userId') userId: number,
  ) {
    return this.service.getMyQuestions(userId, page, limit);
  }

  @Override()
  @Public()
  async getOne(@Param('id') id: number) {
    return this.service.getOneQuestion(id);
  }
}
