/** @format */

import { Task } from "./task";
import { User } from "./user";

export type TaskLike = {
  id: string | number;
  user: User;
  task: Task;
  createdAt: Date;
  updatedAt: Date;
};
