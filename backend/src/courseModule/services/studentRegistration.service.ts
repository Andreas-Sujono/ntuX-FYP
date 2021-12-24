import { CourseUser } from './../entities/courseUser.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { User, UserRole } from 'src/authModule/entities/user.entity';
import { AuthService } from 'src/authModule/services/auth.service';
import { Repository } from 'typeorm';
import {
  StudentRegistration,
  StudentRegistrationStatus,
} from '../entities/studentRegistration.entity';

@Injectable()
export class StudentRegistrationService extends TypeOrmCrudService<StudentRegistration> {
  constructor(
    @InjectRepository(StudentRegistration) repo,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(CourseUser)
    private courseUserRepo: Repository<CourseUser>,
    private authService: AuthService,
  ) {
    super(repo);
  }

  async registerCourse(
    user: User,
    courseId: string | number,
    courseBatchId: string | number,
  ) {
    const existingUser = await this.userRepo.findOne({ email: user.email });
    user.role = UserRole.STUDENT;
    if (!existingUser) {
      const { user: createdUser } = await this.authService.signUp(user);
      await this.repo.save(
        this.repo.create({
          course: courseId as any,
          user: createdUser,
          courseBatch: courseBatchId as any,
          registeredAt: new Date(),
          status: StudentRegistrationStatus.PENDING,
        }),
      );
      return {
        success: true,
      };
    }
    const existingRegistration = await this.repo.findOne({
      where: {
        user: {
          email: user.email,
        },
        course: courseId,
      },
    });
    if (existingRegistration)
      throw new BadRequestException(
        'You have already registered for this course',
      );

    await this.repo.save(
      this.repo.create({
        course: courseId as any,
        user: user.id as any,
        courseBatch: courseBatchId as any,
        registeredAt: new Date(),
        status: StudentRegistrationStatus.PENDING,
      }),
    );
    return {
      success: true,
    };
  }

  //only admin / lecturer
  async changeStudentRegistrationStatus(
    studentRegistrationId: string,
    newStatus: StudentRegistrationStatus,
  ) {
    const studentRegistration = await this.repo.findOne(studentRegistrationId);
    if (!studentRegistration)
      throw new BadRequestException('Student registration not found');

    if (studentRegistration.status === newStatus)
      return {
        success: true,
      };

    if (newStatus === StudentRegistrationStatus.ADMITTED) {
      //add into courseUser
      const existing = await this.courseUserRepo.findOne({
        course: studentRegistration.course,
        user: studentRegistration.user,
      });
      if (!existing) {
        await this.courseUserRepo.save(
          this.courseUserRepo.create({
            course: studentRegistration.course,
            user: studentRegistration.user,
            studentRegistration: studentRegistration,
            courseBatch: studentRegistration.courseBatch,
          }),
        );
      }
    } else {
      //remove from courseUser
      const existing = await this.courseUserRepo.findOne({
        course: studentRegistration.course,
        user: studentRegistration.user,
      });
      if (existing) {
        await this.courseUserRepo.delete({
          course: studentRegistration.course,
          user: studentRegistration.user,
        });
      }
    }

    studentRegistration.status = newStatus;
    await this.repo.save(studentRegistration);
    return {
      success: true,
    };
  }
}
