import { User } from 'src/authModule/entities/user.entity';
import { Tutor } from './tutor.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Course } from 'src/courseModule/entities/course.entity';

export enum TutorRequestStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED',
}

@Entity()
export class TutorRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User; //who create request

  @ManyToOne(() => Tutor)
  tutor: Tutor; //who get the request

  @ManyToOne(() => Tutor)
  course: Course; //who get the request

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  meetingLink: string;

  @Column({ nullable: true, type: 'timestamp with time zone' })
  meetingAt: Date;

  @Column({ nullable: true })
  duration: number;

  @Column({ nullable: true, default: TutorRequestStatus.PENDING })
  status: TutorRequestStatus;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ nullable: true, type: 'timestamp with time zone' })
  updatedAt: Date;
}
