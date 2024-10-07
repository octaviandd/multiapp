/** @format */

import { User } from "./user";

type Task = {
  id: Number;
  title: string;
  recentlyAdded?: boolean;
  body?: string;
  subtasks?: Task[];
  files?: string[];
  comments?: Comment[];
  dueDate?: Date;
  asignee?: string;
  completed?: boolean;
  createdBy?: User;
};

export type { Task };
