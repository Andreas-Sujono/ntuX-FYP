import { RewardController } from './controllers/reward.controller';
import { PortfolioController } from './controllers/portfolio.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoalTaskController } from './controllers/goalTask.controller';
import { GoalTask } from './entities/goalTask.entity';
import { PointEvents } from './entities/pointEvents.entity';
import { Portfolio } from './entities/portfolio.entity';
import { Reward } from './entities/reward.entity';
import { RewardRedeemed } from './entities/rewardRedeemed.entity';
import { WebsiteActivity } from './entities/websiteActivity.entity';
import { EmailService } from './services/email.service';
import { EncryptionService } from './services/encryption.service';
import { LoggerService } from './services/logger.service';
import { RewardRedeemedController } from './controllers/rewardRedeemed.controller';
import { GoalTaskService } from './services/goalTask.entity';
import { PortfolioService } from './services/Portfolio.service';
import { RewardService } from './services/reward.entity';
import { RewardRedeemedService } from './services/rewardRedeemed.service';
import { WebsiteActivityService } from './services/websiteActivity.service';
import { WebsiteActivityController } from './controllers/websiteActivity.controller';
import { User } from 'src/authModule/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      GoalTask,
      PointEvents,
      Portfolio,
      Reward,
      RewardRedeemed,
      WebsiteActivity,
      User,
    ]),
  ],
  providers: [
    EmailService,
    LoggerService,
    EncryptionService,
    GoalTaskService,
    PortfolioService,
    RewardService,
    RewardRedeemedService,
    WebsiteActivityService,
  ],
  exports: [EmailService, LoggerService, EncryptionService],
  controllers: [
    GoalTaskController,
    PortfolioController,
    RewardController,
    RewardRedeemedController,
    WebsiteActivityController,
  ],
})
export class CommonModule {}
