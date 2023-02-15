import { Request } from "express";

// for express request's
export interface RequestDefention extends Request {
  user: {
    admin: boolean;
    uid: string;
    disabled: boolean;
  };
  admin: Object;
}

// question body data
export interface QuestionBody {
  question: string;
  code: string;
  title: string;
  language: string;
  type: string;
  score: string;
  answer: string[];
  tags: [];
  options: [];
  category: [];
}
