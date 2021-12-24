import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
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
  ) {
    super(repo);
  }

  async getPublicAllCourses(): Promise<Course[]> {
    return await this.repo.find({
      status: CourseStatus.PUBLISHED,
    });
  }

  async getMyCourses(userId: string): Promise<Course[]> {
    const query = `SELECT course.* from course_user LEFT JOIN course on course_user.courseId = course.id WHERE user_id = $1`;
    return await this.repo.query(query, [userId]);
  }

  async getAdminAllCourses(): Promise<Course[]> {
    return await this.repo.find({});
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
      batches: courseBatches,
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
}
