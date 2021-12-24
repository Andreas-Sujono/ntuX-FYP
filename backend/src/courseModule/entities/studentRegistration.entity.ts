import { User } from 'src/authModule/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Course } from './course.entity';
import { CourseBatch } from './courseBatch.entity';

export enum StudentRegistrationStatus {
  PENDING = 'PENDING',
  ADMITTED = 'ADMITTED',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED',
}

@Entity()
export class StudentRegistration {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Course)
  course: Course;

  @ManyToOne(() => CourseBatch)
  courseBatch: CourseBatch;

  @Column('timestamp with time zone')
  registeredAt: Date;

  @Column({
    enum: StudentRegistrationStatus,
    default: StudentRegistrationStatus.PENDING,
  })
  status: StudentRegistrationStatus;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ nullable: true, type: 'timestamp with time zone' })
  updatedAt: Date;
}
