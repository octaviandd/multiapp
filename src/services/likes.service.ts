/** @format */

import prisma from "../../prisma/prisma-client";

const getTaskLikes = async (taskId: string) => {
  try {
    const likes = await prisma.taskLike.findMany({
      where: { taskId: Number(taskId) },
    });

    return likes;
  } catch (error: any) {
    throw new Error("Likes not found: " + error.message);
  }
};

const createTaskLike = async (likeData: any) => {
  try {
    const like = await prisma.taskLike.create({
      data: likeData,
    });

    return like;
  } catch (error: any) {
    throw new Error("Failed to create like: " + error.message);
  }
};

const deleteTaskLike = async (likeId: string) => {
  try {
    const like = await prisma.taskLike.delete({
      where: { id: Number(likeId) },
    });

    return true;
  } catch (error: any) {
    throw new Error("Failed to delete like: " + error.message);
  }
};

const getCommentLikes = async (commentId: string) => {
  try {
    const likes = await prisma.commentLike.findMany({
      where: { commentId: Number(commentId) },
    });

    return likes;
  } catch (error: any) {
    throw new Error("Likes not found: " + error.message);
  }
};

const createCommentLike = async (likeData: any) => {
  try {
    const like = await prisma.commentLike.create({
      data: likeData,
    });

    return like;
  } catch (error: any) {
    throw new Error("Failed to create like: " + error.message);
  }
};

const deleteCommentLike = async (commentId: string) => {
  try {
    const like = await prisma.commentLike.delete({
      where: { id: Number(commentId) },
    });

    return true;
  } catch (error: any) {
    throw new Error("Failed to delete like: " + error.message);
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
