import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { AvatarShop } from '../entities/avatarShop.entity';

@Injectable()
export class AvatarShopService extends TypeOrmCrudService<AvatarShop> {
  constructor(@InjectRepository(AvatarShop) repo) {
    super(repo);
  }
}
