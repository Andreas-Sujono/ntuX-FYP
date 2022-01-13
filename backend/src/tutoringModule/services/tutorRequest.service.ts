import {
  TutorRequest,
  TutorRequestStatus,
} from './../entities/tutorRequest.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Injectable()
export class TutorRequestService extends TypeOrmCrudService<TutorRequest> {
  constructor(@InjectRepository(TutorRequest) repo) {
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
}
