/** @format */

import { Request, Response } from "express";
import userService from "../services/user.service";

export const getUserFromSession = async (req: Request, res: Response) => {
  try {
    const userId = req.session.userId;

    if (!userId) {
      return res.status(401).json({ message: "User is not logged in" });
    }

    const user = await userService.getUserById(userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
};

export default { getUserFromSession };
