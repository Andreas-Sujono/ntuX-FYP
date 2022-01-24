import { User } from 'src/authModule/entities/user.entity';
import { Course } from 'src/courseModule/entities/course.entity';
import { CourseBatch } from 'src/courseModule/entities/courseBatch.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

export enum EVENT_TYPE {
  REWARD_CHANGE_STATUS = 'REWARD_CHANGE_STATUS',
  TUTOR_GOT_NEW_OFFER = 'TUTOR_GOT_NEW_OFFER',
  TUTOR_GOT_MESSAGE = 'TUTOR_GOT_MESSAGE',
  TUTOR_REQUEST_STATUS_CHANGED = 'TUTOR_REQUEST_STATUS_CHANGED',
  TUTOR_OFFER_STATUS_CHANGED = 'TUTOR_OFFER_STATUS_CHANGED',
  COURSE_GOT_ANNOUNCEMENT = 'COURSE_GOT_ANNOUNCEMENT',
  ADMIN_GOT_REGISTRATION = 'ADMIN_GOT_REGISTRATION',
  ADMIN_GOT_REWARD = 'ADMIN_GOT_REWARD',
  COURSE_REGISTRATION_CHANGE_STATUS = 'COURSE_REGISTRATION_CHANGE_STATUS',
}

export enum PAGE_REDIRECT {
  STUDENT_REWARD = 'STUDENT_REWARD',
  ADMIN_REWARD = 'ADMIN_REWARD',
  STUDENT_ANNOUNCEMENT = 'STUDENT_ANNOUNCEMENT',
  ADMIN_REGISTRATION = 'ADMIN_REGISTRATION',
  STUDENT_TUTOR = 'STUDENT_TUTOR',
  STUDENT_COURSE = 'STUDENT_COURSE',
}

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.notifications, { nullable: true })
  user: User; //who to send notification

  @ManyToOne(() => CourseBatch, { nullable: true })
  courseBatch: CourseBatch; //send to entire batch

  @ManyToOne(() => Course, { nullable: true })
  course: Course; //send to entire  user

  @Column({ nullable: true, default: false })
  toAllAdmin: boolean;

  @Column()
  eventType: string;

  @Column()
  name: string;

  @Column({ nullable: true, default: '' })
  description: string;

  @Column({ nullable: true })
  itemId: number;

  @Column({ nullable: true })
  pageRedirect: string;

  @Column({ nullable: true, type: 'json' })
  metadata: any;

  @Column({ nullable: true, default: false })
  isViewed: boolean;

  @Column({ nullable: true, type: 'timestamp with time zone' })
  viewedAt: Date;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ nullable: true, type: 'timestamp with time zone' })
  updatedAt: Date;
}
