import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class GoalTask {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  taskName: string;

  @Column({ nullable: true, default: 0 })
  points: number;

  @Column({ nullable: true, default: 0 })
  exps: number;

  @Column({ nullable: true, type: 'timestamp with time zone' })
  deadline: Date;
}
