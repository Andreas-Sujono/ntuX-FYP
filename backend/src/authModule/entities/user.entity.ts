import { PremiumSetting } from './../../commonModule/entities/premiumSetting.entity';
import { Course } from 'src/courseModule/entities/course.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  OneToOne,
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

  @Column({ nullable: true })
  profileImageUrl: string;

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

  @Column({ nullable: true })
  nationality: string;

  @Column({ nullable: true })
  citizenship: string;

  @Column({ nullable: true })
  NRIC: string;

  @Column({ nullable: true, type: 'timestamp with time zone' })
  dateOfBirth: Date;

  @Column({ enum: UserRole, default: UserRole.STUDENT })
  role: UserRole;

  @Column({ nullable: true, default: true })
  isActive: boolean;

  @Column({ nullable: true })
  confirmationCode: string;

  @Column({ nullable: true, type: 'timestamp with time zone' })
  codeExpiresAt: Date;

  @Column({ nullable: true, default: 0 })
  totalPoints: number;

  @Column({ nullable: true, default: 0 })
  totalExps: number;

  @Column({ nullable: true, default: 1 })
  level: number;

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

  @OneToOne(() => PremiumSetting, (premiumSetting) => premiumSetting.user)
  premiumSetting: PremiumSetting;
}
