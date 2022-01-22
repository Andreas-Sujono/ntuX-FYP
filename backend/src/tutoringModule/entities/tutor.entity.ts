import { User } from 'src/authModule/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Course } from 'src/courseModule/entities/course.entity';
import { TutorReview } from './tutorReview.entity';

@Entity()
export class Tutor {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.tutor)
  @JoinColumn()
  user: User;

  @ManyToMany(() => Course)
  @JoinTable()
  courses: Course[];

  @OneToMany(() => TutorReview, (tutorReview) => tutorReview.tutor)
  reviews: TutorReview[];

  @Column({ nullable: true, default: true })
  isActive: boolean;

  @Column({ nullable: true })
  rating: number;

  @Column({ nullable: true, default: 0 })
  totalStudent: number;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ nullable: true, type: 'timestamp with time zone' })
  updatedAt: Date;
}
