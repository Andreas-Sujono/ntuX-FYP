import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

const saltOrRounds = 10;

@Injectable()
export class EncryptionService {
  async hash(data: string) {
    const hash = await bcrypt.hash(data, saltOrRounds);
    return hash;
  }

  async isHashMatched(data: string, hash: string) {
    const isMatch = await bcrypt.compare(data, hash);
    return isMatch;
  }
}
