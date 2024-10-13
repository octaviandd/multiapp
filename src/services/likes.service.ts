/** @format */

import prisma from "../../prisma/prisma-client";

const getLikes = async (taskId: string) => {
  try {
    const likes = await prisma.like.findMany({
      where: { likeId: Number(taskId) },
    });

    return likes;
  } catch (error: any) {
    throw new Error("Likes not found: " + error.message);
  }
};

const createLike = async (likeData: any) => {
  console.log(likeData);
  try {
    const like = await prisma.like.create({
      data: likeData,
    });

    return like;
  } catch (error: any) {
    throw new Error("Failed to create like: " + error.message);
  }
};

const deleteLike = async (likeId: string) => {
  try {
    const like = await prisma.like.findUnique({
      where: { id: Number(likeId) },
    });

    return true;
  } catch (error: any) {
    throw new Error("Failed to delete like: " + error.message);
  }
};

export default {
  getLikes,
  createLike,
  deleteLike,
};
