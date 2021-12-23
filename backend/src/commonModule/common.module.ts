import { Module } from '@nestjs/common';
import { EmailService } from './service/email.service';
import { EncryptionService } from './service/encryption.service';
import { LoggerService } from './service/logger.service';

@Module({
  imports: [],
  providers: [EmailService, LoggerService, EncryptionService],
  exports: [EmailService, LoggerService, EncryptionService],
  controllers: [],
})
export class CommonModule {}
