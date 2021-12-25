import { User } from 'src/authModule/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class PremiumSetting {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @Column({ nullable: true, default: false })
  premiumPortfolioEnabled: boolean;

  @Column({ nullable: true, default: 1 })
  pointMultiplier: number;

  @Column({ nullable: true, default: 1 })
  expMultiplier: number;

  @Column({ type: 'timestamp with time zone' })
  expiredAt: Date;

  @Column({ type: 'timestamp with time zone' })
  premiumPortfolioExpiredAt: Date;

  @Column({ type: 'timestamp with time zone' })
  pointMultiplierExpiredAt: Date;

  @Column({ type: 'timestamp with time zone' })
  expMultiplierExpiredAt: Date;
}