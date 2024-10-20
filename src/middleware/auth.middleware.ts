/** @format */
import { Request, Response } from "express";
import { Session } from "express-session";
import prisma from "../prisma/prisma-client";

declare module "express-session" {
  interface Session {
    userId?: number;
  }
}

export const withAuth = async (
  req: Request,
  res: Response,
  next: () => void
) => {
  if (req.session.user) {
    next();
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export const checkAuth = (req: Request, res: Response) => {
  if (!req.session.user) {
    return res.status(401).json({ authenticated: false });
  } else {
    return res
      .status(200)
      .json({ authenticated: true, user: req.session.user });
  }
};
