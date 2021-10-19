import { Comment, Author } from '../Blog';

export interface Question {
  id: string;
  author: Author;
  question: string;
  description: string;
  postedDate: Date;
  replies?: Comment[];
  isReplied?: boolean;
  isSolved?: boolean;
  numberOfReplied?: number;
  numberOfLikes?: number;
  numberOfVotes?: number;
  numberOfSolutions?: number;
  numberOfViews?: number;
  enableReply?: boolean;
  enableVote?: boolean;
  disableVote?: boolean;
  tags: Tag[];
  comment?: string; //FIXME: share the same component as Comment, need to be separated later on
}

export interface Tag {
  id: string;
  tag: string;
  description: string;
  questionCount?: number;
}

export interface QuestionSummary {
  id: string;
  author: Author;
  question: string;
  description: string;
  postedDate: Date;
  numberOfVotes?: number;
  numberOfSolutions?: number;
  isSolved?: boolean;
  tags: Tag[];
}

export interface ForumUser {
  id: string;
  fullName: string;
  email: string;
  age: number;
  job?: string;
  phoneNumber?: string;
  level: number;
  role: string;
  profileImage: string;
  description: string;
}
