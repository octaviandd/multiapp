/** @format */

import { Task } from "./task";
import { TaskLike } from "./task-like";
import { CommentLike } from "./comment-like";

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role?: string;
  createdAt?: Date;
  updatedAt?: Date;
  tasks?: Task[];
  comments?: Comment[];
  taskLikes?: TaskLike[];
  commentLikes?: CommentLike[];
};
