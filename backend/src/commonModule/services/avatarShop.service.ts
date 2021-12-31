import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { User } from 'src/authModule/entities/user.entity';
import { Repository } from 'typeorm';
import { Avatar } from '../entities/avatar.entity';

@Injectable()
export class AvatarService extends TypeOrmCrudService<Avatar> {
  constructor(
    @InjectRepository(Avatar) repo,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {
    super(repo);
  }

  async buyAvatar(avatarId: number, userId: number) {
    const existing = await this.repo.query(
      'SELECT * FROM avatar_users_user WHERE "avatarId" = $1 and "userId" = $2',
      [avatarId, userId],
    );
    if (existing.length > 0)
      throw new BadRequestException('You already own this avatar');

    const [user, avatar] = await Promise.all([
      this.userRepo.findOne({ id: userId as any }),
      this.repo.findOne({ id: avatarId as any }),
    ]);

    if (user.totalPoints < avatar.pointsRequired)
      throw new BadRequestException('Not enough points');

    await this.repo.query(
      'INSERT INTO avatar_users_user ("avatarId", "userId") values ($1, $2)',
      [avatarId, userId],
    );
    await this.userRepo.update(
      { id: userId as any },
      {
        totalPoints: user.totalPoints - avatar.pointsRequired,
      },
    );
    return {
      success: true,
      avatar,
    };
  }

  async useAvatar(avatarId: number, userId: number) {
    if (avatarId === -1) {
      //default
      await this.userRepo.update(
        { id: userId as any },
        {
          currentAvatar: null,
        },
      );
      return {
        success: true,
      };
    }
    const existing = await this.repo.query(
      'SELECT * FROM avatar_users_user WHERE "avatarId" = $1 and "userId" = $2',
      [avatarId, userId],
    );
    if (existing.length === 0)
      throw new BadRequestException('You do not own this avatar');

    await this.userRepo.update(
      { id: userId as any },
      {
        currentAvatar: avatarId as any,
      },
    );
    return {
      success: true,
    };
  }
}
