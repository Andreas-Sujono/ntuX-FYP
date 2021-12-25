import { ForumQuestion } from './forumQuestion.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class ForumTag {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => ForumQuestion)
  @JoinTable()
  questions: ForumQuestion[];

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ nullable: true, default: 'rgb(119, 236, 83)' })
  color: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ nullable: true, type: 'timestamp with time zone' })
  updatedAt: Date;
}
