/** @format */

import TaskService from "../services/task.service";
import { Request, Response } from "express";

const getTasks = async (req: Request, res: Response) => {
  try {
    const { boardId } = req.params;
    const tasks = TaskService.getTasks(boardId);

    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getTask = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    const task = TaskService.getTask(taskId);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    return res.status(200).json(task);
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const createTask = async (req: Request, res: Response) => {
  try {
    const { title, boardId, displayOrder } = req.body;
    const currentUserId = req.session.userId;
    const task = TaskService.createTask(
      title,
      boardId,
      displayOrder,
      String(currentUserId)
    );

    return res.status(201).json(task);
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = TaskService.deleteTask(id);

    return res.status(200).json(task);
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const updateTask = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;
    const { taskId } = req.params;
    const task = TaskService.updateTask(taskId, title);

    return res.status(200).json(task);
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const updateTaskBoard = async (req: Request, res: Response) => {
  try {
    const { taskId, boardId, displayOrder } = req.body;
    const task = TaskService.updateTaskBoard(taskId, boardId, displayOrder);

    return res.status(200).json(task);
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
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
