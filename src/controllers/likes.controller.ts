/** @format */

import LikesService from "../services/likes.service";
import { Request, Response } from "express";

const getLikes = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    const likes = await LikesService.getLikes(taskId);

    return res.status(200).json(likes);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Internal server error: " + error.message });
  }
};

const createLike = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    const { data } = req.body;
    const currentUserId = String(req.session.userId);
    const likeData = {
      ...data,
      userId: Number(currentUserId),
      taskId: Number(taskId),
    };
    const comment = await LikesService.createLike(likeData);

    return res.status(201).json(comment);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Internal server error: " + error.message });
  }
};

const deleteLike = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const like = await LikesService.deleteLike(id);

    return res.status(200).json(like);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Internal server error: " + error.message });
  }
};

export default {
  getLikes,
  createLike,
  deleteLike,
};
