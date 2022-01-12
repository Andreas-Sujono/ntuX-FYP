import { TutorRequestService } from './services/tutorRequest.service';
import { TutorService } from './services/tutor.service';
import { TutorRequestController } from './controllers/tutorRequest.controller';
import { TutorController } from './controllers/tutor.controller';
import { AuthModule } from '../authModule/auth.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/commonModule/common.module';
import { Tutor } from './entities/tutor.entity';
import { TutorRequest } from './entities/tutorRequest.entity';
import { Course } from 'src/courseModule/entities/course.entity';
import { User } from 'src/authModule/entities/user.entity';
import { CourseModule } from 'src/courseModule/course.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tutor, TutorRequest, Course, User]),
    CommonModule,
    AuthModule,
    CourseModule,
  ],
  controllers: [TutorController, TutorRequestController],
  providers: [TutorService, TutorRequestService],
  exports: [],
})
export class TutoringModule {}
