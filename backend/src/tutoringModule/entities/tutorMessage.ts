import { User } from 'src/authModule/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { TutorRequest } from './tutorRequest.entity';

@Entity()
export class TutorMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => TutorRequest)
  tutorRequest: TutorRequest; //who create request

  @ManyToOne(() => User)
  sender: User; //who send the message

  @ManyToOne(() => User)
  recipient: User; //who get the message

  @Column({ nullable: true })
  text: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ nullable: true, type: 'timestamp with time zone' })
  updatedAt: Date;
}
