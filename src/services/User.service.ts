/** @format */

import prisma from "../../prisma/prisma-client";

const getUserById = async (userId: number) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { tasks: true, notes: true },
    });

    return user;
  } catch (error: any) {
    throw new Error("User not found: " + error.message);
  }
};

const updateUser = async (userId: number, data: any) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      data
    });

    return user
  } catch (error: any) {
    throw new Error("User not found: " + error.message);
  }
};

export default { getUserById, updateUser };
