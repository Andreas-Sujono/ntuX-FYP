import { Id, User } from './../Auth/index';

export interface GoalTask {
  id: Id;
  taskName: string;
  points: number;
  exps: number;
  deadline: Date;
}

export interface PremiumSetting {
  id: Id;
  user: User;
  premiumPortfolioEnabled: boolean;
  pointMultiplier: number;
  expMultiplier: number;
  expiredAt: Date;
  premiumPortfolioExpiredAt: Date;
  pointMultiplierExpiredAt: Date;
  expMultiplierExpiredAt: Date;
}

export interface Reward {
  id: Id;
  name: string;
  description: string;
  imageUrl?: string;
  totalPointsRequired: number;
  totalExpsRequired: number;
  isPublished: boolean;
  islimitedOnePerStudent?: boolean;
  totalLimit?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface RewardRedeemed {
  id: Id;
  user: User;
  reward: Reward;
  description: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface WebsiteActivity {
  id: Id;
  date: Date;
  visitWithoutLogin: number;
  visitWithLogin: number;
  totalQuestion: number;
  totalAnswer: number;
  totalTutorRequest: number;
  totalTutorRequestAccepted: number;
}

export interface StudentWebsiteActivity {
  id: Id;
  user: User;
  date: Date;
  visitWithoutLogin?: number;
  visitWithLogin: number;
  totalQuestion: number;
  totalAnswer: number;
  totalTutorRequest?: number;
  totalTutorRequestAccepted?: number;
}
