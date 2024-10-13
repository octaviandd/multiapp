/** @format */

import { CommentLike, Note, Transaction } from "@prisma/client";
import { Task } from "./task";
import { TaskLike } from "./task-like";

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  notes: Note[];
  tasks: Task[];
  comments: Comment[];
  taskLikes: TaskLike[];
  commentLikes: CommentLike[];
  transactions: Transaction[];
};
