/** @format */

import prisma from "../prisma/prisma-client";

const getTasks = async (boardId: string) => {
  try {
    const tasks = await prisma.task.findMany({
      where: { boardId: Number(boardId) },
    });

    return tasks;
  } catch (error: any) {
    throw new Error("Tasks not found: " + error.message);
  }
};

const getTask = async (taskId: string) => {
  try {
    const task = await prisma.task.findUnique({
      where: { id: Number(taskId) },
      include: {
        author: true,
        files: {
          include: {
            file: true,
          },
        },
        comments: {
          include: {
            author: true,
          },
        },
        taskLikes: true,
      },
    });

    return task;
  } catch (error: any) {
    throw new Error("Task not found: " + error.message);
  }
};

const updateTask = async (taskId: string, data: any) => {
  try {
    const task = await prisma.task.update({
      where: { id: Number(taskId) },
      data,
    });

    return task;
  } catch (error: any) {
    throw new Error("Failed to update task: " + error.message);
  }
};

const deleteTask = async (taskId: string) => {
  try {
    const task = await prisma.task.delete({
      where: { id: Number(taskId) },
    });

    return true;
  } catch (error: any) {
    throw new Error("Failed to delete task: " + error.message);
  }
};

const createTask = async (data: any) => {
  try {
    const task = await prisma.task.create({
      data,
      include: {
        author: true,
        comments: true,
      },
    });

    return task;
  } catch (error: any) {
    throw new Error("Failed to create task: " + error.message);
  }
};

const addTaskFile = async (fileId: number, taskId: number) => {
  try {
    const file = await prisma.taskFile.create({
      data: {
        fileId,
        taskId,
      },
    });

    return file;
  } catch (error: any) {
    throw new Error("Failed to add task file: " + error.message);
  }
};

export default {
  getTask,
  updateTask,
  deleteTask,
  createTask,
  addTaskFile,
  getTasks,
};
