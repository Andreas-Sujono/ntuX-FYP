import { ForumTagController } from './controllers/forumTag.controller';
import { ForumAnswerController } from './controllers/forumAnswer.controller';
import { ForumQuestionController } from './controllers/forumQuestion.controller';
import { ForumAnswerService } from './services/forumAnswer.service';
import { ForumAnswer } from './entities/forumAnswer.entity';
import { AuthModule } from '../authModule/auth.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/commonModule/common.module';
import { ForumQuestion } from './entities/forumQuestion.entity';
import { ForumTag } from './entities/ForumTag.entity';
import { ForumQuestionService } from './services/forumQuestion.service';
import { ForumTagService } from './services/forumTag.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ForumQuestion, ForumAnswer, ForumTag]),
    CommonModule,
    AuthModule,
  ],
  controllers: [
    ForumQuestionController,
    ForumAnswerController,
    ForumTagController,
  ],
  providers: [ForumQuestionService, ForumAnswerService, ForumTagService],
  exports: [],
})
export class ForumModule {}
