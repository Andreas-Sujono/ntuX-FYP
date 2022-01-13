import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { User, UserRole } from 'src/authModule/entities/user.entity';
import { CourseUser } from 'src/courseModule/entities/courseUser.entity';
import { IsNull, Not, Repository } from 'typeorm';
import {
  EVENT_TYPE,
  Notification,
  PAGE_REDIRECT,
} from '../entities/notification.entity';

@Injectable()
export class NotificationService extends TypeOrmCrudService<Notification> {
  constructor(
    @InjectRepository(Notification) repo,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(CourseUser)
    private courseUserRepo: Repository<CourseUser>,
  ) {
    super(repo);
  }

  async getManyNotification(userId: number) {
    const notifications = await this.repo.find({
      where: {
        user: userId,
      },
      take: 50,
      order: {
        createdAt: 'DESC',
      },
    });
    return notifications;
  }

  async updateNotificationView(
    userId: number,
    batchId?: number,
    courseId?: number,
  ) {
    await Promise.all([
      // this.repo.update(
      //   {
      //     isViewed: false,
      //     courseBatch: batchId as any,
      //   },
      //   {
      //     isViewed: true,
      //   },
      // ),
      // this.repo.update(
      //   {
      //     isViewed: false,
      //     course: courseId as any,
      //   },
      //   {
      //     isViewed: true,
      //   },
      // ),
      this.repo.update(
        {
          isViewed: false,
          user: userId as any,
        },
        {
          isViewed: true,
        },
      ),
    ]);
    return {
      success: true,
    };
  }

  async createNotification(dto: Partial<Notification>, userId?: number) {
    let pageRedirect = PAGE_REDIRECT.STUDENT_REWARD;
    if (dto.eventType === EVENT_TYPE.REWARD_CHANGE_STATUS)
      pageRedirect = PAGE_REDIRECT.STUDENT_REWARD;
    if (dto.eventType === EVENT_TYPE.ADMIN_GOT_REWARD)
      pageRedirect = PAGE_REDIRECT.ADMIN_REWARD;
    if (dto.eventType === EVENT_TYPE.COURSE_GOT_ANNOUNCEMENT)
      pageRedirect = PAGE_REDIRECT.STUDENT_ANNOUNCEMENT;
    if (dto.eventType === EVENT_TYPE.ADMIN_GOT_REGISTRATION)
      pageRedirect = PAGE_REDIRECT.ADMIN_REGISTRATION;
    if (
      dto.eventType === EVENT_TYPE.TUTOR_GOT_MESSAGE ||
      dto.eventType === EVENT_TYPE.TUTOR_GOT_NEW_REQUEST ||
      dto.eventType === EVENT_TYPE.TUTOR_GOT_NEW_OFFER
    )
      pageRedirect = PAGE_REDIRECT.STUDENT_TUTOR;
    if (dto.eventType === EVENT_TYPE.COURSE_REGISTRATION_CHANGE_STATUS)
      pageRedirect = PAGE_REDIRECT.STUDENT_COURSE;

    if (dto.toAllAdmin) {
      const allAdmin = await this.userRepo.find({
        where: {
          isActive: true,
          role: UserRole.ADMIN,
          emailVerifiesAt: Not(IsNull()),
        },
      });
      allAdmin.forEach((admin) => {
        return this.repo.save(
          this.repo.create({
            createdAt: new Date(),
            isViewed: false,
            user: admin,
            eventType: dto.eventType,
            pageRedirect,
            ...dto,
          }),
        );
      });
      return;
    } else if (dto.courseBatch) {
      const allUsers = await this.courseUserRepo.find({
        where: {
          courseBatch: dto.courseBatch,
        },
        relations: ['user'],
      });
      allUsers.forEach((item) => {
        return this.repo.save(
          this.repo.create({
            createdAt: new Date(),
            isViewed: false,
            user: item.user,
            eventType: dto.eventType,
            pageRedirect,
            ...dto,
          }),
        );
      });
      return;
    } else if (dto.course) {
      const allUsers = await this.courseUserRepo.find({
        where: {
          course: dto.course,
        },
        relations: ['user'],
      });
      allUsers.forEach((item) => {
        return this.repo.save(
          this.repo.create({
            createdAt: new Date(),
            isViewed: false,
            user: item.user,
            eventType: dto.eventType,
            pageRedirect,
            ...dto,
          }),
        );
      });
      return;
    }

    return this.repo.save(
      this.repo.create({
        createdAt: new Date(),
        isViewed: false,
        user: userId as any,
        eventType: dto.eventType,
        pageRedirect,
        ...dto,
      }),
    );
  }
}
