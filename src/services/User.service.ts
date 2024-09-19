/** @format */

import prisma from "../../prisma/prisma-client";

const getUserById = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { tasks: true, notes: true },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

const updateUser = async (userId: number, data: any) => {
  const user = await prisma.user.update({
    where: { id: userId },
    data,
  });

  return user;
};

export default { getUserById, updateUser };
