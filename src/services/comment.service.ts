/** @format */

import prisma from "../prisma/prisma-client";

const getComments = async (taskId: string) => {
  try {
    const comments = await prisma.comment.findMany({
      where: { taskId: Number(taskId) },
      include: {
        author: true,
        commentLikes: true,
      },
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

const createComment = async (commentData: any) => {
  try {
    const comment = await prisma.comment.create({
      data: commentData,
      include: {
        author: true,
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

export default {
  getComments,
  getComment,
  createComment,
  deleteComment,
};
