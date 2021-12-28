import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Reward {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ nullable: true })
  totalPointsRequired: number;

  @Column({ nullable: true })
  totalExpsRequired: number;

  @Column({ nullable: true, default: false })
  isPublished: boolean;

  @Column({ nullable: true, default: false })
  islimitedOnePerStudent: boolean;

  @Column({ nullable: true, default: false })
  isDefault: boolean;

  @Column({ nullable: true })
  totalLimit: number;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ nullable: true, type: 'timestamp with time zone' })
  updatedAt: Date;
}
