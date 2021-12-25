import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Portfolio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, default: false })
  isPublished: boolean;

  @Column()
  jobRole: string;

  @Column({ nullable: true })
  profileImageUrl: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  templateId: string;

  @Column({ nullable: true })
  resumeLink: string;

  @Column({ type: 'json', nullable: true })
  socialMediasJson: Record<string, any>;

  @Column({ type: 'json', nullable: true })
  educationsJSON: Record<string, any>;

  @Column({ type: 'json', nullable: true })
  workExperiencesJSON: Record<string, any>;

  @Column({ type: 'json', nullable: true })
  projectsJSON: Record<string, any>;

  @Column({ type: 'json', nullable: true })
  certificatesJSON: Record<string, any>;

  @Column({ type: 'json', nullable: true })
  skillsJSON: Record<string, any>;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ nullable: true, type: 'timestamp with time zone' })
  updatedAt: Date;
}
