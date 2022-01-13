import { User } from 'src/authModule/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinTable,
  JoinColumn,
} from 'typeorm';

@Entity()
export class PremiumSetting {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.premiumSetting)
  @JoinColumn()
  user: User;

  @Column({ nullable: true, default: false })
  premiumPortfolioEnabled: boolean;

  @Column({ nullable: true, default: 1 })
  pointMultiplier: number;

  @Column({ nullable: true, default: 1 })
  expMultiplier: number;

  @Column({ type: 'timestamp with time zone', nullable: true })
  expiredAt: Date;

  @Column({ type: 'timestamp with time zone', nullable: true })
  premiumPortfolioExpiredAt: Date;

  @Column({ type: 'timestamp with time zone', nullable: true })
  pointMultiplierExpiredAt: Date;

  @Column({ type: 'timestamp with time zone', nullable: true })
  expMultiplierExpiredAt: Date;
}
