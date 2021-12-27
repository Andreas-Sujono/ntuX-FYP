import { CourseUser } from './courseUser.entity';
import { User } from 'src/authModule/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { CourseAnnouncement } from './courseAnnouncement.entity';
import { CourseBatch } from './courseBatch.entity';
import { CourseContent } from './courseContent.entity';
import { StudentRegistration } from './studentRegistration.entity';

export enum CourseStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
}

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => CourseBatch, (courseBatch) => courseBatch.course)
  courseBatches: CourseBatch[];

  @OneToMany(
    () => CourseAnnouncement,
    (courseAnnouncement) => courseAnnouncement.course,
  )
  courseAnnouncements: CourseAnnouncement[];

  @OneToMany(() => CourseContent, (item) => item.course)
  courseContents: CourseContent[];

  @OneToMany(() => CourseUser, (item) => item.course)
  courseUsers: CourseUser[];

  @OneToMany(() => StudentRegistration, (item) => item.course)
  studentRegistrations: StudentRegistration[];

  @Column()
  name: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ nullable: true, default: '' })
  description: string;

  @Column({ nullable: true, default: '' })
  objectives: string;

  @Column({ nullable: true, default: '' })
  outline: string;

  @Column({ nullable: true })
  totalHours: number;

  @Column({ enum: CourseStatus, default: CourseStatus.DRAFT }) //DRAFT, PUBLISHED
  status: CourseStatus;

  @Column()
  code: string;

  @ManyToMany(() => User)
  @JoinTable()
  lecturers: User[];

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ nullable: true, type: 'timestamp with time zone' })
  updatedAt: Date;
}
