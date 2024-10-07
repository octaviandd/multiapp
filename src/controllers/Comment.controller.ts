/** @format */

import CommentService from "../services/comment.service";
import { Request, Response } from "express";

const getComments = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    const comments = await CommentService.getComments(taskId);

    return res.status(200).json(comments);
  } catch (error: any) {
    return res.status(500).json({ message: "Internal server error: " + error.message });
  }
};

const getComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const comment = await CommentService.getComment(id);


    return res.status(200).json(comment);
  } catch (error: any) {
    return res.status(500).json({ message: "Internal server error: " + error.message });
  }
};

const createComment = async (req: Request, res: Response) => {
  try {
    const { content, taskId } = req.body;
    const currentUserId = (req.user as { id: string }).id;
    const comment = await CommentService.createComment(
      content,
      taskId,
      currentUserId
    );

    return res.status(201).json(comment);
  } catch (error: any) {
    return res.status(500).json({ message: "Internal server error: " + error.message });
  }
};

const deleteComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const comment = await CommentService.deleteComment(id);

    return res.status(200).json(comment);
  } catch (error: any) {
    return res.status(500).json({ message: "Internal server error: " + error.message });
  }
};

const updateComment = async (req: Request, res: Response) => {
  try {
    const { id, content } = req.body;
    const comment = await CommentService.updateComment(id, content);

    return res.status(200).json(comment);
  } catch (error: any) {
    return res.status(500).json({ message: "Internal server error: " + error.message });
  }
};

export default {
  getComments,
  getComment,
  createComment,
  deleteComment,
  updateComment,
};
