/** @format */

import prisma from "../../prisma/prisma-client";

export const getUser = async () => {
  const user = await prisma.user.findUnique({
    where: { username },
    include: { tasks: true, notes: true },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return { ...user };
};
