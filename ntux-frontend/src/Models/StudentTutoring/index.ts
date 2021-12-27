import { User } from 'Models/Auth';
import { Course } from 'Models/Courses';
import { Id } from './../Auth/index';

export enum TutorRequestStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED',
}

export interface Tutor {
  id: Id;
  user: User;
  courses: Course[];
  isActive: boolean;
  rating: number;
  totalStudent: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TutorRequest {
  id: number;
  user: User; //who create request
  tutor: Tutor; //who get the request
  description: string;
  meetingLink: string;
  meetingAt: Date;
  duration: number;
  status: TutorRequestStatus;
  createdAt: Date;
  updatedAt: Date;
}
