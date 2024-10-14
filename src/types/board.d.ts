/** @format */

import { Task } from "./task";

export type Board = {
  id: string | number;
  temporaryId?: string;
  title: string;
  displayOrder: number;
  tasks: Task[];
  recentlyAdded?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};
