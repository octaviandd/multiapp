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
      include: {
        createdBy: true,
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

const updateTaskBoard = async (taskId: string, data: any) => {
  try {
    const task = await prisma.task.update({
      where: { id: Number(taskId) },
      data,
    });

    return task;
  } catch (error: any) {
    throw new Error("Failed to update task board: " + error.message);
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
        createdBy: true,
      },
    });

    return task;
  } catch (error: any) {
    throw new Error("Failed to create task: " + error.message);
  }
};

export default {
  getTask,
  updateTask,
  deleteTask,
  createTask,
  getTasks,
  updateTaskBoard,
};
