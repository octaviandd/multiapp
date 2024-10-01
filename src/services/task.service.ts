/** @format */

import prisma from "../../prisma/prisma-client";

const getTasks = async (boardId: string) => {
  try {
    const tasks = await prisma.task.findMany({
      where: { boardId: Number(boardId) },
    });

    if (tasks.length == 0) {
      throw new Error("No tasks found on this board");
    }
    return tasks;
  } catch (error) {
    console.log("Error fetching tasks:", error);
    throw new Error("Failed to fetch tasks");
  }
};

const getTask = async (taskId: string) => {
  try {
    const task = await prisma.task.findUnique({
      where: { id: Number(taskId) },
    });

    return task;
  } catch (error) {
    throw new Error("Task not found");
  }
};

const updateTask = async (taskId: string, title: string) => {
  const task = await prisma.task.update({
    where: { id: Number(taskId) },
    data: { title },
  });

  return task;
};

const updateTaskBoard = async (
  taskId: string,
  boardId: string,
  displayOrder: number
) => {
  const task = await prisma.task.update({
    where: { id: Number(taskId) },
    data: { boardId: Number(boardId), displayOrder },
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

export default {
  getTask,
  updateTask,
  deleteTask,
  createTask,
  getTasks,
  updateTaskBoard,
};
