import { Id, User } from './../Auth/index';

export interface Answer {
  id: Id;
  user: User;
  question: Question;
  parentAnswer: Answer;
  childrenAnswers: Answer[];
  name: string;
  description: string;
  upvote: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Question {
  id: Id;
  user: User;
  tags: Tag;
  parentQuestion: Question;
  childrenQuestions: Question[];
  answers: Answer[];
  name: string;
  description: string;
  upvote: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Tag {
  id: string;
  questions: Question[];
  name: string;
  description: string;
  color: string;
}
