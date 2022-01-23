import { Injectable } from '@nestjs/common';
import { StorageService } from './storage.service';

@Injectable()
export class CommonService {
  constructor(private storageService: StorageService) {}

  async uploadFile(file: any, type: string) {
    const res = await this.storageService.uploadFile(file.buffer, type);
    return res;
  }
}
