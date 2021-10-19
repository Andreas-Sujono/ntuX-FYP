export type Id = string | number;

export interface SocialMedia {
  facebookLink?: string;
  telegramLink?: string;
  twitterLink?: string;
  whatsappLink?: string;
  linkedinLink?: string;
}

export interface User {
  id: Id;
  fullName: string;
  email: string;
  age: number;
  profession?: string;
  phoneNumber?: string;
  profileImage?: string;
  description?: string;
  role?: string;
  followersCount?: number;
  followingsCount?: number;
  socialMedia?: SocialMedia;
}

export interface SignupRequest {
  accountType: number;
  email: string;
  password: string;
  fullName?: string;
}

export interface LoginRequest {
  accountType: number;
  email: string;
  password: string;
}
