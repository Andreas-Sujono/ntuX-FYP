import { Course } from 'src/courseModule/entities/course.entity';
import { CourseBatch } from 'src/courseModule/entities/courseBatch.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class CourseWebsiteActivity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  date: Date;

  @Column({ nullable: true, default: 0 })
  visitWithLogin: number;

  @ManyToOne(() => Course)
  course: Course;

  @ManyToOne(() => CourseBatch)
  courseBatch: CourseBatch;
}
