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
} from 'typeorm';
import { Course } from 'src/courseModule/entities/course.entity';

@Entity()
export class Tutor {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  @JoinTable()
  user: User;

  @ManyToMany(() => Course)
  courses: Course[];

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
