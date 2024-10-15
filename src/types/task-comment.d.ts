/** @format */

export type Comment = {
  id: number;
  authorId: string | number;
  taskId: string | number;
  createdAt?: Date;
  updatedAt?: Date;
};
