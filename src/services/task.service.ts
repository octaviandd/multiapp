/** @format */

import prisma from "../../prisma/prisma-client";

const getTasks = async (boardId: string) => {
  const tasks = await prisma.task.findMany({
    where: { boardId: Number(boardId) },
  });

  return tasks;
};

const getTask = async (taskId: string) => {
  const task = await prisma.task.findUnique({
    where: { id: Number(taskId) },
  });

  if (!task) {
    throw new Error("Task not found");
  }

  return task;
};

const updateTask = async (taskId: string, title: string) => {
  const task = await prisma.task.update({
    where: { id: Number(taskId) },
    data: { title },
  });

  return task;
};

const deleteTask = async (taskId: string) => {
  const task = await prisma.task.delete({
    where: { id: Number(taskId) },
  });

  return true;
};

const createTask = async (
  title: string,
  boardId: string,
  displayOrder: number,
  createdById: string
) => {
  const task = await prisma.task.create({
    data: {
      title,
      boardId: Number(boardId),
      displayOrder,
      createdById: Number(createdById),
    },
  });

  return task;
};

export default { getTask, updateTask, deleteTask, createTask, getTasks };
