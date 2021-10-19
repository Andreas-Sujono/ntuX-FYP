import { Id, User } from 'Models/Auth';

export interface Teacher extends User {
  isTeacher?: boolean;
  specializations: string;
}

// can be a recorded link or live
export interface VideoCourse {
  id: Id;
  name: string;
  estimatedDuration: number;
  isLive: boolean;
  link: string;
  teacher: Teacher;
}

// test can be offline or live
export interface Exam {
  id: Id;
  name: string;
  description: string;
  isLive: boolean;
  startTime: number;
  endTime: number;
  isPassed: boolean;
}

export interface CourseResource {
  id: Id;
  name: string;
  description?: string;
  link: string;
}

export interface Course {
  id: Id;
  name: string;
  code: string;
  estimatedDuration: number;
  description: string;
  image: string;
  comingSoon?: boolean;
  videos: VideoCourse[];
  exams: Exam[];
  resources: CourseResource[];
  handbookLink?: string;
  reviewLink?: string;
}

export interface Major {
  id: Id;
  name: string;
  relatedCourses: string[];
  estimatedDuration: number;
  image: string;
  comingSoon?: boolean;
}
