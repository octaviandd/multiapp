/** @format */

import { Task } from "./task";

export type TaskLike = {
  id: string | number;
  authorId: string | number;
  task: Task;
  createdAt: Date;
  updatedAt: Date;
};
