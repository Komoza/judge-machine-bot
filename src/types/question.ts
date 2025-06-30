import {TUser} from "./user";

export type TQuestion = {
  question: string;
  author: TUser;
  user: TUser;
  timestamp: number;
};