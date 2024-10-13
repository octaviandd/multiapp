/** @format */

import { CommentLike } from "@prisma/client";
import { Task } from "./task";
import { TaskLike } from "./task-like";

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  tasks: Task[];
  comments: Comment[];
  taskLikes: TaskLike[];
  commentLikes: CommentLike[];
};
