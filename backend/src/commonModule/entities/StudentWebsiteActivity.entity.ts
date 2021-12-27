import { User } from 'src/authModule/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class StudentWebsiteActivity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('date')
  date: Date;

  @ManyToOne(() => User)
  user: User;

  @Column({ nullable: true, default: 0 })
  visitWithoutLogin: number;

  @Column({ nullable: true, default: 0 })
  visitWithLogin: number;

  @Column({ nullable: true, default: 0 })
  totalQuestion: number;

  @Column({ nullable: true, default: 0 })
  totalAnswer: number;

  @Column({ nullable: true, default: 0 })
  totalTutorRequest: number;

  @Column({ nullable: true, default: 0 })
  totalTutorRequestAccepted: number;
}
