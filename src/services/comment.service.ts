/** @format */

import prisma from "../../prisma/prisma-client";

const getComments = async (taskId: string) => {
  try {
    const comments = await prisma.comment.findMany({
      where: { taskId: Number(taskId) },
    });

    return comments;
  } catch (error: any) {
    throw new Error("Comments not found: " + error.message);
  }
};

const getComment = async (commentId: string) => {
  try {
    const comment = await prisma.comment.findUnique({
      where: { id: Number(commentId) },
    });

    return comment;
  } catch (error: any) {
    throw new Error("Comment not found: " + error.message);
  }
};

const createComment = async (
  content: string,
  taskId: string,
  currentUserId: string
) => {
  try {
    const comment = await prisma.comment.create({
      data: {
        content,
        taskId: Number(taskId),
        authorId: Number(currentUserId),
      },
    });

    return comment;
  } catch (error: any) {
    throw new Error("Failed to create comment: " + error.message);
  }
};

const deleteComment = async (commentId: string) => {
  try {
    const comment = await prisma.comment.findUnique({
      where: { id: Number(commentId) },
    });

    return true;
  } catch (error: any) {
    throw new Error("Failed to delete comment: " + error.message);
  }
};

const updateComment = async (commentId: string, content: string) => {
  try {
    const comment = await prisma.comment.findUnique({
      where: { id: Number(commentId) },
      data: { content },
    });

    return comment;
  } catch (error) {
    throw new Error("Failed to update comment: " + error.message);
  }
};

export default {
  getComments,
  getComment,
  createComment,
  deleteComment,
  updateComment,
};
