/** @format */

import CommentService from "../services/comment.service";
import { Request, Response } from "express";

const getComments = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    const comments = CommentService.getComments(taskId);

    return res.status(200).json(comments);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const comment = CommentService.getComment(id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    return res.status(200).json(comment);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const createComment = async (req: Request, res: Response) => {
  try {
    const { content, taskId } = req.body;
    const currentUserId = (req.user as { id: string }).id;
    const comment = CommentService.createComment(
      content,
      taskId,
      currentUserId
    );

    return res.status(201).json(comment);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const comment = CommentService.deleteComment(id);

    return res.status(200).json(comment);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateComment = async (req: Request, res: Response) => {
  try {
    const { id, content } = req.body;
    const comment = CommentService.updateComment(id, content);

    return res.status(200).json(comment);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default {
  getComments,
  getComment,
  createComment,
  deleteComment,
  updateComment,
};
