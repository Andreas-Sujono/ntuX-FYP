import { WebsiteActivityService } from 'src/commonModule/services/websiteActivity.service';
import {
  TutorRequest,
  TutorRequestStatus,
} from './../entities/tutorRequest.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { TutorReview } from '../entities/tutorReview.entity';
import { TutorMessage } from '../entities/tutorMessage.entity';
import { Tutor } from '../entities/tutor.entity';
import { NotificationService } from 'src/commonModule/services/notification.service';
import { EVENT_TYPE } from 'src/commonModule/entities/notification.entity';

@Injectable()
export class TutorRequestService extends TypeOrmCrudService<TutorRequest> {
  constructor(
    @InjectRepository(TutorRequest) repo,
    @InjectRepository(Tutor)
    private tutorRepo: Repository<Tutor>,
    @InjectRepository(TutorReview)
    private tutorReviewRepo: Repository<TutorReview>,
    @InjectRepository(TutorMessage)
    private tutorMessageRepo: Repository<TutorMessage>,
    private websiteActivityService: WebsiteActivityService,
    private notificationService: NotificationService,
  ) {
    super(repo);
  }

  async getMyRequest(userId: number) {
    return this.repo.find({
      where: {
        user: userId,
      },
      relations: [
        'tutor',
        'course',
        'tutor.user',
        'tutor.user.currentAvatar',
        'messages',
        'reviews',
      ],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async createRequest(userId: number, dto: Partial<TutorRequest>) {
    const pendingRequest = await this.repo.find({
      where: {
        user: userId,
        status: TutorRequestStatus.PENDING,
      },
    });

    const exsitingPendingWithTutor = await this.repo.findOne({
      where: {
        user: userId,
        status: TutorRequestStatus.PENDING,
        tutor: dto.tutor,
      },
    });
    if (pendingRequest.length >= 5) {
      throw new Error('You can only have 5 pending request at one time');
    }
    if (exsitingPendingWithTutor) {
      throw new BadRequestException(
        'You have already sent a request to this tutor',
      );
    }

    const res = await this.repo.save(
      this.repo.create({
        user: userId as any,
        tutor: dto.tutor,
        course: dto.course,
        description: dto.description,
        meetingLink: dto.meetingLink,
        ...dto,
      }),
    );

    //create notif
    this.notificationService.createNotification(
      {
        eventType: EVENT_TYPE.TUTOR_GOT_NEW_OFFER,
        name: 'You got a new tutor request',
        metadata: res,
        itemId: res.id,
        user: dto.tutor as any,
      },
      dto.tutor as any,
    );

    //create activity
    this.websiteActivityService.updateWebsiteActivity(
      {
        totalTutorRequest: 1,
      },
      userId,
    );

    return res;
  }

  async updateRequest(dto: Partial<TutorRequest>) {
    const existing = await this.repo.findOne({
      where: { id: dto.id },
      relations: ['tutor', 'tutor.user'],
    });
    const res = await this.repo.update({ id: dto.id }, dto);

    //create notif
    this.notificationService.createNotification(
      {
        eventType: EVENT_TYPE.TUTOR_OFFER_STATUS_CHANGED,
        name: 'Your tutor request has been ' + dto.status,
        metadata: res,
        itemId: res.raw[0].id,
        user: existing.tutor.user.id as any,
      },
      existing.tutor.user.id,
    );
    return res;
  }

  async getMyOffer(userId: number) {
    return this.repo.find({
      where: {
        tutor: {
          user: userId,
        },
      },
      relations: [
        'tutor',
        'course',
        'tutor.user',
        'tutor.user.currentAvatar',
        'user',
        'messages',
      ],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async updateOffer(dto: Partial<TutorRequest>, userId: number) {
    if (dto.status === TutorRequestStatus.ACCEPTED) {
      //create activity
      this.websiteActivityService.updateWebsiteActivity(
        {
          totalTutorRequestAccepted: 1,
        },
        userId,
      );
    }

    const existing = await this.repo.findOne({
      where: { id: dto.id },
      relations: ['user'],
    });
    const res = await this.repo.update({ id: dto.id }, dto);

    //create notif
    this.notificationService.createNotification(
      {
        eventType: EVENT_TYPE.TUTOR_REQUEST_STATUS_CHANGED,
        name: 'Your tutor request has been ' + dto.status,
        metadata: res,
        itemId: res.raw[0].id,
        user: existing.user.id as any,
      },
      existing.user.id,
    );
    return res;
  }

  async getAllChats(tutorRequestId: number) {
    return this.tutorMessageRepo.find({
      where: {
        tutorRequest: tutorRequestId,
      },
      relations: ['tutor'],
      order: {
        createdAt: 'ASC',
      },
    });
  }

  async createChat(tutorRequestId: number, body: any, userId: number) {
    return this.tutorMessageRepo.save(
      this.tutorMessageRepo.create({
        ...body,
        tutorRequest: tutorRequestId as any,
        user: userId as any,
      }),
    );
  }

  async createReview(
    tutorRequestId: number,
    body: Partial<TutorReview>,
    userId: number,
  ) {
    const existing = await this.tutorReviewRepo.findOne({
      where: {
        tutorRequest: tutorRequestId,
        user: userId,
      },
    });

    if (existing)
      throw new BadRequestException('You have already reviewed this tutor');

    const res = await this.tutorReviewRepo.save(
      this.tutorReviewRepo.create({
        ...body,
        tutorRequest: tutorRequestId as any,
        user: userId as any,
      }),
    );

    //update review rating
    await this.updateTutorReview(body.tutor as any);

    return res;
  }

  async updateTutorReview(tutorId: number) {
    const allReviews = await this.tutorReviewRepo.find({
      where: {
        tutor: tutorId,
      },
    });
    const sumRating = allReviews.reduce((acc, cur) => {
      return acc + cur.rating;
    }, 0);
    const finalRating = sumRating / allReviews.length;

    return this.tutorRepo.update({ id: tutorId }, { rating: finalRating });
  }
}
