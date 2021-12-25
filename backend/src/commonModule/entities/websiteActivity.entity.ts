import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class WebsiteActivity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('date')
  date: Date;

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
