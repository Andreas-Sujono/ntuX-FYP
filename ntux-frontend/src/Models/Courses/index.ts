import { Id, User } from 'Models/Auth';

export enum CourseStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
}

export enum CourseBatchStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
}

export enum StudentRegistrationStatus {
  PENDING = 'PENDING',
  ADMITTED = 'ADMITTED',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED',
}

export interface CourseBatch {
  id: Id;
  course: Course;
  name: string;
  startDate: Date;
  endDate: Date;
  registrationStartsAt: Date;
  registrationEndsAt: Date;
  status: CourseBatchStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface Course {
  id: Id;
  name: string;
  imageUrl?: string;
  description?: string;
  objectives?: string;
  outline?: string;
  totalHours?: number;
  status: CourseStatus;
  code: string;
  lecturers: User[];
  createdAt: Date;
  updatedAt: Date;
  bacthes: CourseBatch[];
}

export interface CourseContent {
  id: Id;
  course: Course;
  courseBatch?: CourseBatch;
  pageName: string;
  pageId: string;
  pageOrder: number;
  metadata: any;
  createdAt: Date;
  updatedAt: Date;
}

export interface CourseAnnouncement {
  id: Id;
  course: Course;
  courseBatch?: CourseBatch;
  metadata: any;
  isSendingEmail: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface StudentRegistration {
  id: Id;
  user: User;
  course: Course;
  courseBatch: CourseBatch;
  registeredAt: Date;
  status: StudentRegistrationStatus;
  createdAt: Date;
  updatedAt: Date;
}
