import { AuthModule } from './../authModule/auth.module';
import { CourseContentController } from './controllers/courseContent.controller';
import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/commonModule/common.module';
import { CourseController } from './controllers/course.controller';
import { CourseBatchController } from './controllers/courseBatch.controller';
import { CourseAnnouncementController } from './controllers/courseAnnouncement.controller';
import { CourseService } from './services/course.service';
import { CoursebatchService } from './services/courseBatch.service';
import { CourseContentService } from './services/courseContent.service';
import { CourseAnnouncementService } from './services/courseAnnouncement.service';
import { Course } from './entities/course.entity';
import { CourseUser } from './entities/courseUser.entity';
import { CourseBatch } from './entities/courseBatch.entity';
import { CourseContent } from './entities/courseContent.entity';
import { CourseAnnouncement } from './entities/courseAnnouncement.entity';
import { StudentRegistration } from './entities/studentRegistration.entity';
import { StudentRegistrationController } from './controllers/studentRegistration.controller';
import { StudentRegistrationService } from './services/studentRegistration.service';
import { User } from 'src/authModule/entities/user.entity';
import { ForumTag } from 'src/forumModule/entities/forumTag.entity';
import { ForumModule } from 'src/forumModule/forum.module';
import { ForumTagService } from 'src/forumModule/services/forumTag.service';
import { ForumQuestionService } from 'src/forumModule/services/forumQuestion.service';
import { ForumAnswerService } from 'src/forumModule/services/forumAnswer.service';

@Module({
  imports: [
    CacheModule.register(),
    TypeOrmModule.forFeature([
      Course,
      CourseUser,
      CourseBatch,
      CourseContent,
      CourseAnnouncement,
      StudentRegistration,
      User,
      ForumTag,
    ]),
    ForumModule,
    CommonModule,
    AuthModule,
  ],
  controllers: [
    CourseController,
    CourseBatchController,
    CourseContentController,
    CourseAnnouncementController,
    StudentRegistrationController,
  ],
  providers: [
    CourseService,
    CoursebatchService,
    CourseContentService,
    CourseAnnouncementService,
    StudentRegistrationService,
    ForumTagService,
  ],
  exports: [
    CourseService,
    CoursebatchService,
    CourseContentService,
    CourseAnnouncementService,
  ],
})
export class CourseModule {}
