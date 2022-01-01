import { ForumQuestion } from './forumQuestion.entity';
import { User } from 'src/authModule/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class ForumAnswer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => ForumQuestion, (forumQuestion) => forumQuestion.answers)
  question: ForumQuestion;

  @ManyToOne(() => ForumAnswer, (forumAnswer) => forumAnswer.childrenAnswers)
  parentAnswer: ForumAnswer;

  @OneToMany(() => ForumAnswer, (forumAnswer) => forumAnswer.parentAnswer)
  childrenAnswers: ForumAnswer[];

  @Column()
  name: string;

  @Column({ nullable: true, default: '' })
  description: string;

  @Column({ type: 'json' })
  metadata: any;

  @Column({ nullable: true, default: 0 })
  upvote: number;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ nullable: true, type: 'timestamp with time zone' })
  updatedAt: Date;
}
