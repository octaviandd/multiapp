/** @format */

import { Comment } from "./task-comment";

export type CommentLike = {
  id: string | number;
  authorId: string | number;
  task: Comment;
  createdAt: Date;
  updatedAt: Date;
};
