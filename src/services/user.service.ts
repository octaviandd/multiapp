/** @format */

import prisma from "../prisma/prisma-client";
import bcrypt from "bcrypt";

const createUser = async ({
  email,
  password,
  first_name,
  last_name,
}: {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user) {
      throw new Error("User with this email already exists");
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await prisma.user.create({
        data: {
          firstName: first_name,
          lastName: last_name,
          email,
          password: hashedPassword,
          role: "",
        },
        include: {
          tasks: true,
          taskLikes: true,
          comments: true,
          commentLikes: true,
        }
      });

      return newUser;
    }
  } catch (error: any) {
    throw new Error("Failed to create user: " + error.message);
  }
};

const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        tasks: true,
        taskLikes: true,
        comments: true,
        commentLikes: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    return user;
  } catch (error: any) {
    throw new Error("Failed to login user: " + error.message);
  }
};

const getUserById = async (userId: number) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { tasks: true },
    });

    return user;
  } catch (error: any) {
    throw new Error("User not found: " + error.message);
  }
};

const updateUser = async (userId: number, data: any) => {
  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data,
    });

    return user;
  } catch (error: any) {
    throw new Error("User not found: " + error.message);
  }
};

export default { getUserById, updateUser, loginUser, createUser };
