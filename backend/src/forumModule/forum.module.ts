import { ForumTagController } from './controllers/forumTag.controller';
import { ForumAnswerController } from './controllers/forumAnswer.controller';
import { ForumQuestionController } from './controllers/forumQuestion.controller';
import { ForumAnswerService } from './services/forumAnswer.service';
import { ForumAnswer } from './entities/forumAnswer.entity';
import { AuthModule } from '../authModule/auth.module';
import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/commonModule/common.module';
import { ForumQuestion } from './entities/forumQuestion.entity';
import { ForumTag } from './entities/forumTag.entity';
import { ForumQuestionService } from './services/forumQuestion.service';
import { ForumTagService } from './services/forumTag.service';
import { User } from 'src/authModule/entities/user.entity';

@Module({
  imports: [
    CacheModule.register(),
    TypeOrmModule.forFeature([ForumTag, ForumQuestion, ForumAnswer, User]),
    CommonModule,
    AuthModule,
  ],
  controllers: [
    ForumQuestionController,
    ForumAnswerController,
    ForumTagController,
  ],
  providers: [ForumQuestionService, ForumAnswerService, ForumTagService],
  exports: [ForumTagService, ForumQuestionService, ForumAnswerService],
})
export class ForumModule {}
