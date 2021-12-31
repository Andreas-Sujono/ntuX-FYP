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
    const existingUser = await this.userRepo.findOne({
      where: [
        {
          email: user.email,
        },
        {
          id: user?.id,
        },
      ],
    });
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
        user: existingUser,
        course: courseId,
      },
    });

    if (existingRegistration)
      throw new BadRequestException(
        'You have already registered for this course',
      );

    //authenticate user
    await this.authService.login(
      existingUser.email,
      existingUser.hashedPassword,
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
    const studentRegistration = await this.repo.findOne({
      where: {
        id: studentRegistrationId,
      },
      relations: ['user', 'course', 'courseBatch'],
    });
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

  async createStudentRegistration(
    userId: string,
    status: StudentRegistrationStatus,
    courseId: string | number,
    courseBatchId: string | number,
  ) {
    const existingRegistration = await this.repo.findOne({
      where: {
        user: userId,
        course: courseId,
      },
    });
    if (existingRegistration)
      throw new BadRequestException(
        'Student have already registered for this course',
      );

    const createdStudentRegistration = await this.repo.save(
      this.repo.create({
        course: courseId as any,
        user: userId as any,
        courseBatch: courseBatchId as any,
        registeredAt: new Date(),
        status,
      }),
    );

    if (status === StudentRegistrationStatus.ADMITTED) {
      //add into courseUser
      const existing = await this.courseUserRepo.findOne({
        course: courseId as any,
        user: userId as any,
      });
      if (!existing) {
        await this.courseUserRepo.save(
          this.courseUserRepo.create({
            course: courseId as any,
            user: userId as any,
            studentRegistration: createdStudentRegistration,
            courseBatch: courseBatchId as any,
          }),
        );
      }
    } else {
      //remove from courseUser
      const existing = await this.courseUserRepo.findOne({
        course: courseId as any,
        user: userId as any,
      });
      if (existing) {
        await this.courseUserRepo.delete({
          course: courseId as any,
          user: userId as any,
        });
      }
    }
  }
}
