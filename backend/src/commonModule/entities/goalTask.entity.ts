import { User } from 'src/authModule/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';

export enum ModuleType {
  FORUM = 'FORUM',
  PORTFOLIO = 'PORTFOLIO',
  TUTORING = 'TUTORING',
  COURSE = 'COURSE',
  REWARD = 'REWARD',
  PROFILE = 'PROFILE',
}

export enum TaskType {
  FORUM_UPVOTE = 'FORUM_UPVOTE',
  TUTORING_REQUEST = 'TUTORING_REQUEST',
  TUTORING_ACCEPT = 'TUTORING_ACCEPT',
  COURSE_START = 'COURSE_START',
  COURSE_FINISH = 'COURSE_FINISH',
  PORTFOLIO_CREATE = 'PORTFOLIO_CREATE',
  REWARD_REDEEM = 'REWARD_REDEEM',
  REWARD_BUY_AVATAR = 'REWARD_BUY_AVATAR',
  REWARD_BUY_PREMIUM = 'REWARD_BUY_PREMIUM',

  // done handled
  FORUM_ASK_QUESTION = 'FORUM_ASK_QUESTION',
  FORUM_ANSWER_QUESTION = 'FORUM_ANSWER_QUESTION',
  PROFILE_LOGIN = 'PROFILE_LOGIN',
  PROFILE_UPDATE = 'PROFILE_UPDATE',
  REWARD_LEVEL_UP = 'REWARD_LEVEL_UP', //handled by FE
}

@Entity()
export class GoalTask {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  moduleType: string;

  @Column({ nullable: true })
  taskType: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true, default: 0 })
  points: number;

  @Column({ nullable: true, default: 0 })
  exps: number;

  @Column({ nullable: true, default: 1 })
  level: number;

  @Column({ nullable: true, default: 1 })
  quantity: number;

  @Column({ nullable: true, type: 'timestamp with time zone' })
  deadline: Date;

  @ManyToMany(() => User, (user) => user.achievements)
  @JoinTable()
  users: User[];
}
