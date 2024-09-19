/** @format */

import prisma from "../../prisma/prisma-client";

const getComments = async (taskId: string) => {
  const comments = await prisma.comment.findMany({
    where: { taskId: Number(taskId) },
  });

  return comments;
};

const getComment = async (commentId: string) => {
  const comment = await prisma.comment.findUnique({
    where: { id: Number(commentId) },
  });

  if (!comment) {
    throw new Error("Comment not found");
  }

  return comment;
};

const createComment = async (
  content: string,
  taskId: string,
  currentUserId: string
) => {
  const comment = await prisma.comment.create({
    data: {
      content,
      taskId: Number(taskId),
      authorId: Number(currentUserId),
    },
  });

  return comment;
};

const deleteComment = async (commentId: string) => {
  const comment = await prisma.comment.delete({
    where: { id: Number(commentId) },
  });

  return true;
};

const updateComment = async (commentId: string, content: string) => {
  const comment = await prisma.comment.update({
    where: { id: Number(commentId) },
    data: { content },
  });

  return comment;
};

export default {
  getComments,
  getComment,
  createComment,
  deleteComment,
  updateComment,
};
