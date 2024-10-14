/** @format */

import TaskService from "../services/task.service";
import { Request, Response } from "express";

const getTasks = async (req: Request, res: Response) => {
  try {
    const { boardId } = req.params;
    const tasks = await TaskService.getTasks(boardId);

    return res.status(200).json(tasks);
  } catch (error: any) {
    return res.status(500).json({
      message: "Internal server error: " + error.message,
    });
  }
};

const getTask = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    const task = await TaskService.getTask(taskId);

    return res.status(200).json(task);
  } catch (error: any) {
    return res.status(500).json({
      message: "Internal server error: " + error.message,
    });
  }
};

const createTask = async (req: Request, res: Response) => {
  try {
    const { data } = req.body;
    const currentUserId = req.session.user.id;
    data.authorId = currentUserId;
    const task = await TaskService.createTask(data);

    return res.status(201).json(task);
  } catch (error: any) {
    return res.status(500).json({
      message: "Internal server error: " + error.message,
    });
  }
};

const deleteTask = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    const task = await TaskService.deleteTask(taskId);

    return res.status(200).json(task);
  } catch (error: any) {
    return res.status(500).json({
      message: "Internal server error: " + error.message,
    });
  }
};

const updateTask = async (req: Request, res: Response) => {
  try {
    const { data } = req.body;
    const { taskId } = req.params;
    const task = await TaskService.updateTask(taskId, data);

    return res.status(200).json(task);
  } catch (error: any) {
    return res.status(500).json({
      message: "Internal server error: " + error.message,
    });
  }
};

const updateTaskBoard = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    const { data } = req.body;
    const task = await TaskService.updateTaskBoard(taskId, data);

    return res.status(200).json(task);
  } catch (error: any) {
    return res.status(500).json({
      message: "Internal server error: " + error.message,
    });
  }
};

export default {
  getTasks,
  getTask,
  createTask,
  deleteTask,
  updateTask,
  updateTaskBoard,
};
