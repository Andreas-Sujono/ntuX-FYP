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
  ) {
    super(repo);
  }

  async getMyRequest(userId: number) {
    return this.repo.find({
      where: {
        user: userId,
      },
      relations: ['tutor', 'course'],
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
    if (pendingRequest.length >= 5) {
      throw new Error('You can only have 5 pending request at one time');
    }
    return this.repo.save(
      this.repo.create({
        user: userId as any,
        tutor: dto.tutor,
        course: dto.course,
        description: dto.description,
        meetingLink: dto.meetingLink,
        ...dto,
      }),
    );
  }

  async updateRequest(dto: Partial<TutorRequest>) {
    return this.repo.update({ id: dto.id }, dto);
  }

  async getMyOffer(userId: number) {
    return this.repo.find({
      where: {
        tutor: userId,
      },
      relations: ['tutor', 'course'],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async updateOffer(dto: Partial<TutorRequest>) {
    return this.repo.update({ id: dto.id }, dto);
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

  async createReview(tutorRequestId: number, body: any, userId: number) {
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
    this.updateTutorReview(body.tutor);

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
