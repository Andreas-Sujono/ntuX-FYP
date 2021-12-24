import { Course } from 'src/courseModule/entities/course.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';

export enum UserRole {
  STUDENT = 'STUDENT',
  ADMIN = 'ADMIN',
  LECTURER = 'LECTURER',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column()
  givenName: string;

  @Column()
  familyName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  hashedPassword: string;

  @Column({ nullable: true })
  salutation: string;

  @Column()
  nationality: string;

  @Column()
  citizenship: string;

  @Column({ nullable: true })
  NRIC: string;

  @Column({ nullable: true, type: 'timestamp with time zone' })
  dateOfBirth: Date;

  @Column({ enum: UserRole })
  role: string;

  @Column({ nullable: true, default: true })
  isActive: boolean;

  @Column({ nullable: true })
  confirmationCode: string;

  @Column({ nullable: true, type: 'timestamp with time zone' })
  codeExpiresAt: Date;

  @Column({ nullable: true, type: 'timestamp with time zone' })
  emailVerifiesAt: Date;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ nullable: true, type: 'timestamp with time zone' })
  updatedAt: Date;

  @Column({ nullable: true, type: 'timestamp with time zone' })
  deletedAt: Date;

  @ManyToMany(() => Course)
  courses: Course[]; //for lecturers only
}
