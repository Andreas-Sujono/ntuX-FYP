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
import { StudentRegistration } from './studentRegistration.entity';

export type CourseUserActivity = Record<string, any>;

@Entity()
export class CourseUser {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Course)
  course: Course;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => CourseBatch)
  courseBatch: CourseBatch;

  @ManyToOne(() => StudentRegistration)
  studentRegistration: StudentRegistration;

  @Column({ type: 'json', nullable: true })
  activity: CourseUserActivity;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ nullable: true, type: 'timestamp with time zone' })
  updatedAt: Date;
}
