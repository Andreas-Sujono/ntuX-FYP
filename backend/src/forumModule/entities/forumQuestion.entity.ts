import { ForumAnswer } from './forumAnswer.entity';
import { ForumTag } from './forumTag.entity';
import { User } from 'src/authModule/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  OneToMany,
} from 'typeorm';

@Entity()
export class ForumQuestion {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(
    () => ForumQuestion,
    (forumQuestion) => forumQuestion.childrenQuestions,
  )
  parentQuestion: ForumQuestion;

  @OneToMany(
    () => ForumQuestion,
    (forumQuestion) => forumQuestion.parentQuestion,
  )
  childrenQuestions: ForumQuestion[];

  @OneToMany(() => ForumAnswer, (forumAnswer) => forumAnswer.question)
  answers: ForumAnswer[];

  @ManyToMany(() => ForumTag)
  tags: ForumTag[];

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ nullable: true, default: 0 })
  upvote: number;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ nullable: true, type: 'timestamp with time zone' })
  updatedAt: Date;
}
