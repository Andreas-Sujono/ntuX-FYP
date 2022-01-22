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
export class TutorMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Tutor)
  tutor: Tutor;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => TutorRequest, (tutorRequest) => tutorRequest.messages)
  tutorRequest: TutorRequest;

  @Column({ nullable: true })
  chat: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ nullable: true, type: 'timestamp with time zone' })
  updatedAt: Date;
}
