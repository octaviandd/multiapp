/** @format */

import LikesService from "../services/likes.service";
import { Request, Response } from "express";

const getTaskLikes = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    const likes = await LikesService.getTaskLikes(taskId);

    return res.status(200).json(likes);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Internal server error: " + error.message });
  }
};

const createTaskLike = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    const currentUserId = String(req.session.user.id);
    const likeData = {
      authorId: Number(currentUserId),
      taskId: Number(taskId),
    };

    const like = await LikesService.createTaskLike(likeData);

    return res.status(201).json(like);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Internal server error: " + error.message });
  }
};

const deleteTaskLike = async (req: Request, res: Response) => {
  try {
    const { likeId } = req.params;
    await LikesService.deleteTaskLike(likeId);

    return res.status(200).json(true);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Internal server error: " + error.message });
  }
};

const getCommentLikes = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;
    const likes = await LikesService.getCommentLikes(commentId);

    return res.status(200).json(likes);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Internal server error: " + error.message });
  }
};

const createCommentLike = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;
    const currentUserId = String(req.session.user.id);
    const likeData = {
      authorId: Number(currentUserId),
      commentId: Number(commentId),
    };
    const comment = await LikesService.createCommentLike(likeData);

    return res.status(201).json(comment);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Internal server error: " + error.message });
  }
};

const deleteCommentLike = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const like = await LikesService.deleteCommentLike(id);

    return res.status(200);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Internal server error: " + error.message });
  }
};

export default {
  getTaskLikes,
  createTaskLike,
  deleteTaskLike,
  getCommentLikes,
  createCommentLike,
  deleteCommentLike,
};
