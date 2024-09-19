/** @format */
import { Request, Response } from "express";
import { Session } from "express-session";

declare module "express-session" {
  interface Session {
    userId?: number;
  }
}

export const withAuth = (req: Request, res: Response, next: () => void) => {
  if (req.session.userId) {
    next();
  } else {
    res.redirect("/login");
  }
};
