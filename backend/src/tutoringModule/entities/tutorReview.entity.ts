import { User } from 'src/authModule/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Tutor } from './tutor.entity';
import { TutorRequest } from './tutorRequest.entity';

@Entity()
export class TutorReview {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Tutor, (tutor) => tutor.reviews)
  tutor: Tutor;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => TutorRequest, (tutorRequest) => tutorRequest.reviews)
  tutorRequest: TutorRequest;

  @Column({ nullable: true, type: 'float' })
  rating: number;

  @Column({ nullable: true })
  review: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ nullable: true, type: 'timestamp with time zone' })
  updatedAt: Date;
}
