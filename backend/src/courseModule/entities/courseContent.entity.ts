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
export class CourseContent {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Course)
  course: Course;

  @ManyToOne(() => CourseBatch)
  courseBatch: CourseBatch;

  @Column()
  pageName: string;

  @Column()
  pageId: string;

  @Column()
  pageOrder: number;

  @Column('json')
  metadata: any;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ nullable: true, type: 'timestamp with time zone' })
  updatedAt: Date;
}
