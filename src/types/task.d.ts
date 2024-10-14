/** @format */

import { Board } from "./board";
import { User } from "./user";

type Task = {
  id: string | number;
  temporaryId?: string;
  title: string;
  body?: string;
  asignee?: User;
  dueDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  displayOrder?: number;
  completed?: boolean;
  comments?: Comment[];
  files?: File[];
  parentBoard?: Board;
  recentlyAdded?: boolean;
  author?: User;
};

export type { Task };
