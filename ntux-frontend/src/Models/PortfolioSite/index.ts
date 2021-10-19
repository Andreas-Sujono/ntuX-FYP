import { BlogPreview } from '../Blog';

export interface Setting {
  order?: number;
  isHidden?: boolean;
}

export interface Section<T> {
  data: T;
  setting?: Setting;
}

export type SocialMediaType =
  | 'instagram'
  | 'facebook'
  | 'telegram'
  | 'whatsapp'
  | 'linkedin'
  | 'twitter';

export interface SocialMedia {
  id: string;
  type: SocialMediaType;
  link: string;
}

export interface UserSummary {
  fullName: string;
  role: string;
  email: string;
  phoneNumber: string;
  description: string;
  socialMedias: SocialMedia[];
  backgroundImage: string;
  profileImage: string;
  resumeLink?: string;
}

export interface WorkExperience {
  id: string;
  companyName: string;
  companyLogo?: string;
  role: string;
  employmentType:
    | 'full_time'
    | 'part_time'
    | 'internship'
    | 'contract'
    | 'self_employed'
    | 'freelance';
  location: string;
  description: string;
  startDate: Date;
  endDate?: Date;
}

export interface Education {
  id: string;
  schoolName: string;
  schoolLogo?: string;
  grade: string;
  fieldOfStudy: string;
  degree: string;
  description: string;
  startDate: Date;
  endDate?: Date;
}

export interface Certification {
  id: string;
  name: string;
  organization: string;
  startDate: Date;
  endDate?: Date;
  link: string;
  imageUrl: string;
}

export interface Skill {
  id: string;
  name: string;
}

export interface SiteContribution {
  questionCount: number;
  solutionCount: number;
  blogCount: number;
}

export interface AllSiteData {
  userSummary: Section<UserSummary>;
  WorkExperiences: Section<WorkExperience[]>;
  educations: Section<Education[]>;
  certifications: Section<Certification[]>;
  siteContribution: Section<SiteContribution>;
  skills: Section<Skill[]>;
  blogs: Section<BlogPreview[]>;
}

export type SectionItem = Section<any> & { sectionName: keyof AllSiteData };
