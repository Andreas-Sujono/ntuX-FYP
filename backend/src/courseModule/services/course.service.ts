import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { User } from 'src/authModule/entities/user.entity';
import { Repository } from 'typeorm';
import { Course, CourseStatus } from '../entities/course.entity';
import { CourseBatch } from '../entities/courseBatch.entity';
import { CourseUser } from '../entities/courseUser.entity';

@Injectable()
export class CourseService extends TypeOrmCrudService<Course> {
  constructor(
    @InjectRepository(Course) repo,
    @InjectRepository(CourseUser)
    private courseUserRepo: Repository<CourseUser>,
    @InjectRepository(CourseBatch)
    private courseBatchRepo: Repository<CourseBatch>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {
    super(repo);
  }

  async getPublicAllCourses(): Promise<Course[]> {
    return await this.repo.find({
      where: {
        status: CourseStatus.PUBLISHED,
      },
      relations: ['lecturers', 'courseBatches'],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async getStudentCourses(userId: string): Promise<CourseUser[]> {
    const res = await this.courseUserRepo.find({
      where: {
        user: userId as any,
      },
      relations: ['course', 'courseBatch'],
    });
    return res;
  }

  async getStudentRegistered(userId: string, courseId: string) {
    const courseUser = await this.courseUserRepo.findOne({
      where: {
        user: userId,
        course: courseId,
      },
      relations: ['course', 'courseBatch', 'course.lecturers'],
    });
    return courseUser;
  }

  async adminGetOneCourse(courseId: string) {
    const courseUser = await this.repo.findOne({
      where: {
        id: courseId,
      },
      relations: [
        'courseBatches',
        'courseAnnouncements',
        'courseContents',
        'studentRegistrations',
        'lecturers',
      ],
    });
    return courseUser;
  }

  async getRecommendationCourses(userId: string) {
    const coursesRegistered = await this.courseUserRepo.find({
      where: {
        user: userId as any,
      },
      relations: ['course'],
    });
    if (coursesRegistered.length === 0) return this.repo.find();

    const coursesNotRegistered = await this.repo.query(`
      select * from course where id not in (${coursesRegistered
        .map((course) => course.course.id)
        .join(',')})
    `);
    return coursesNotRegistered;
  }

  async getAdminAllCourses(): Promise<Course[]> {
    return await this.repo.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async getOneCourse(courseId: number) {
    const courseDetail = await this.repo.find({
      where: {
        id: courseId,
      },
      relations: ['lecturers'],
    });
    const courseBatches = await this.courseBatchRepo.find({
      course: { id: courseId },
    });
    return {
      ...(courseDetail[0] || {}),
      courseBatches,
    };
  }

  async addCourseUserActivity(userId: string, courseId: string, data: any) {
    //data  {question: 1}, {answer: 1}, {login: 1}
    const courseUser = await this.courseUserRepo.findOne({
      where: {
        user: userId,
        course: courseId,
      },
    });
    const currentActivity = courseUser.activity;
    const todayDate = new Date().toLocaleDateString();
    let finalActivity: any = {};
    if (!currentActivity) {
      finalActivity = {
        [todayDate]: data,
      };
    } else {
      finalActivity = {
        ...currentActivity,
        [todayDate]: {
          ...currentActivity[todayDate],
          question:
            (currentActivity[todayDate].question || 0) + (data.question || 0),
          answer: (currentActivity[todayDate].answer || 0) + (data.answer || 0),
          login: (currentActivity[todayDate].login || 0) + (data.login || 0),
        },
      };
    }

    await this.courseUserRepo.update(courseUser.id, {
      activity: finalActivity,
    });
    return { success: true };
  }

  //for admin
  async getStudentSummary(userId: string) {
    const user = await this.userRepo.findOne({
      id: userId as any,
    });
    const courses = await this.getStudentCourses(userId);
    return {
      user,
      courses,
    };
  }
}
