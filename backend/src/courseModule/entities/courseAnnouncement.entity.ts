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

@Entity()
export class CourseAnnouncement {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Course)
  course: Course;

  @ManyToOne(() => CourseBatch)
  courseBatch: CourseBatch;

  @Column({ type: 'json' })
  metadata: any;

  @Column({ nullable: true, default: 'DRAFT' })
  status: string; //DRAFT | PUBLISHED

  @Column({ nullable: true, default: true })
  isSendingEmail: boolean;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ nullable: true, type: 'timestamp with time zone' })
  updatedAt: Date;
}
