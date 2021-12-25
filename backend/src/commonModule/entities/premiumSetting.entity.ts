import { User } from 'src/authModule/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinTable,
} from 'typeorm';

@Entity()
export class PremiumSetting {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.premiumSetting)
  @JoinTable()
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
