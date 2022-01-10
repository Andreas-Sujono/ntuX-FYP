import { CourseContent } from './../entities/courseContent.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { User } from 'src/authModule/entities/user.entity';
import { LessThan, Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Course, CourseStatus } from '../entities/course.entity';
import { CourseBatch, CourseBatchStatus } from '../entities/courseBatch.entity';
import { CourseUser } from '../entities/courseUser.entity';
import { ForumTag } from 'src/forumModule/entities/forumTag.entity';
import { ForumTagService } from 'src/forumModule/services/forumTag.service';

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
    @InjectRepository(CourseContent)
    private courseContentRepo: Repository<CourseContent>,
    @InjectRepository(ForumTag) private forumTagRepo: Repository<ForumTag>, // private forumTagService: ForumTagService,
  ) {
    super(repo);
  }

  async getPublicAllCourses(): Promise<Course[]> {
    const res = await this.repo.find({
      where: {
        status: CourseStatus.PUBLISHED,
      },
      relations: ['lecturers', 'courseBatches'],
      order: {
        createdAt: 'DESC',
      },
    });
    res.forEach((item) => {
      item.courseBatches = item.courseBatches || [];
      item.courseBatches = item.courseBatches.filter(
        (batch) => batch.status === CourseBatchStatus.PUBLISHED,
      );
    });
    return res;
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

  async getLecturerCourses(userId: string) {
    const res = await this.userRepo.find({
      where: {
        user: userId as any,
      },
      relations: ['courses', 'courses.courseBatches'],
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
        .join(',')}) and course.status = 'PUBLISHED'
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
      status: CourseBatchStatus.PUBLISHED,
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

  async createCourse(req: any, dto: Course) {
    const created = await this.createOne(req, dto);

    //create default course content
    await this.courseContentRepo.save(
      this.courseContentRepo.create({
        course: created.id as any,
        courseBatch: null,
        pageName: 'Lesson 1',
        pageId: '101', //default
        pageOrder: 1,
        metadata: [
          {
            id: uuid(),
            html: 'Lesson 1',
            tag: 'h1',
            imageUrl: '',
          },
        ],
        createdAt: new Date(),
      }),
    );

    //create default tag
    this.forumTagRepo.save(
      this.forumTagRepo.create({
        name: dto.code,
        description: dto.description,
      }),
    );

    return created;
  }

  async updateCourse(req: any, dto: Course) {
    const created = await this.updateOne(req, dto);
    //update default tag

    if (dto.code && dto.description)
      this.forumTagRepo.update(
        { name: dto.code },
        {
          name: dto.code,
          description: dto.description,
        },
      );

    return created;
  }

  async deleteCourse(req: any, id: string) {
    await this.repo.query(`
      delete from course_content where "courseId" = ${id};
      delete from course_batch where "courseId" = ${id};
      delete from course_announcement where "courseId" = ${id};
      delete from course_user where "courseId" = ${id};
      delete from student_registration where "courseId" = ${id};
      delete from course_lecturers_user where "courseId" = ${id};
    `);
    return await this.deleteOne(req);
  }

  async getCompletedCourse(userId: number) {
    const res = await this.courseUserRepo.find({
      where: {
        user: userId as any,
        'courseBatch.endDate': LessThan(new Date()),
      },
      relations: ['course', 'courseBatch'],
    });
    return res;
  }
}
