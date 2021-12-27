import { PremiumSetting } from 'Models/pointsRewards';

export type Id = string | number;

export enum Role {
  STUDENT = 'STUDENT',
  ADMIN = 'ADMIN',
  LECTURER = 'LECTURER',
}

export interface User {
  id: Id;
  profileImageUrl?: string;
  fullName: string;
  givenName: string;
  familyName: string;
  email: string;
  salutation?: string;
  nationality?: string;
  citizenship?: string;
  NRIC?: string;
  dateOfBirth?: string;
  role: Role;
  isActive: boolean;
  totalPoints: number;
  totalExps: number;
  level: number;
  emailVerifiesAt?: Date;
  premiumSetting?: PremiumSetting;
}
export interface LoginRequest {
  email: string;
  password: string;
}

export interface ConfirmEmailRequest {
  email: string;
  token: string;
}
