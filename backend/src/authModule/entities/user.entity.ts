import { PremiumSetting } from './../../commonModule/entities/premiumSetting.entity';
import { Course } from 'src/courseModule/entities/course.entity';
import { Exclude } from 'class-transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  OneToOne,
  ManyToOne,
} from 'typeorm';
import { AvatarShop } from 'src/commonModule/entities/avatarShop.entity';

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

  @Column({ nullable: true, default: '#f44336' })
  avatarColor: string;

  @ManyToOne(() => AvatarShop)
  avatar: AvatarShop;

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

  @Exclude()
  @Column({ nullable: true })
  NRIC: string;

  @Exclude()
  @Column({ nullable: true, type: 'timestamp with time zone' })
  dateOfBirth: Date;

  @Column({ enum: UserRole, default: UserRole.STUDENT })
  role: UserRole;

  @Exclude()
  @Column({ nullable: true, default: true })
  isActive: boolean;

  @Exclude()
  @Column({ nullable: true })
  confirmationCode: string;

  @Exclude()
  @Column({ nullable: true, type: 'timestamp with time zone' })
  codeExpiresAt: Date;

  @Column({ nullable: true, default: 0 })
  totalPoints: number;

  @Column({ nullable: true, default: 0 })
  totalExps: number;

  @Column({ nullable: true, default: 1 })
  level: number;

  @Exclude()
  @Column({ nullable: true, type: 'timestamp with time zone' })
  emailVerifiesAt: Date;

  @Exclude()
  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ nullable: true, type: 'timestamp with time zone' })
  updatedAt: Date;

  @Exclude()
  @Column({ nullable: true, type: 'timestamp with time zone' })
  deletedAt: Date;

  @ManyToMany(() => Course)
  courses: Course[]; //for lecturers only

  @OneToOne(() => PremiumSetting, (premiumSetting) => premiumSetting.user)
  premiumSetting: PremiumSetting;
}
