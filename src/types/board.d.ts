/** @format */

import { Task } from "./task";

export type Board = {
  id: number;
  title: string;
  tasks: Task[];
  recentlyAdded?: boolean;
};