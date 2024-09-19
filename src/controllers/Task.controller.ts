/** @format */

import TaskService from "../services/task.service";
import { Request, Response } from "express";

const getTasks = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const tasks = TaskService.getTasks(id);

    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = TaskService.getTask(id);

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
    const currentUserId = (req.user as { id: string }).id;
    const task = TaskService.createTask(
      title,
      boardId,
      displayOrder,
      currentUserId
    );

    return res.status(201).json(task);
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
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
    const { id, title } = req.body;
    const task = TaskService.updateTask(id, title);

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
};
