/** @format */

import { Request, Response } from "express";
import userService from "../services/user.service";
import { User } from "../types/user";
import prisma from "../prisma/prisma-client";

declare module "express-session" {
  interface Session {
    user: User;
  }
}

const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password, first_name, last_name } = req.body;
    const user = await userService.createUser({
      email,
      password,
      first_name,
      last_name,
      profileImage: "https://picsum.photos/100/100",
    });

    req.session.user = user as any;
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await userService.loginUser({ email, password });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    req.session.user = user as any;
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
};

const logoutUser = async (req: Request, res: Response) => {
  try {
    req.session.destroy(() => {
      res.status(200).json({ message: "User logged out" });
    });
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
};

const getUserFromSession = async (req: Request, res: Response) => {
  if (req.session.user) {
    const user = await prisma.user.findUnique({
      where: {
        id: req.session.user.id,
      },
      include: {
        tasks: true,
        taskLikes: true,
        comments: true,
        commentLikes: true,
      },
    });

    req.session.user = user as any;
    return res
      .status(200)
      .json({ authenticated: true, user: req.session.user });
  } else {
    return res.status(401).json({ authenticated: false });
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(Number(id));

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
};

const getUserCompletedTasks = async (req: Request, res: Response) => {
  try {
    const { id } = req.session.user;
    const user = await userService.getUserCompletedTasks(Number(id));

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
};

export default {
  getUserFromSession,
  getUser,
  registerUser,
  loginUser,
  logoutUser,
  getUserCompletedTasks,
};
