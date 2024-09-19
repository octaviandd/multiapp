/** @format */

import { Request, Response } from "express";
import userService from "../services/user.service";

const getUserFromSession = async (req: Request, res: Response) => {
  try {
    const userId = req.session.userId;

    if (!userId) {
      return res.status(401).json({ message: "User is not logged in" });
    }

    const user = await userService.getUserById(Number(userId));
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
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

export default { getUserFromSession, getUser };
