/** @format */
import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.user = { username: null, verified: false };
  //   const { LOGIN_PRIVATE_KEY }  = process.env;
  const privateKey: Secret = "secret";
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearerToken = bearerHeader.split(" ")[1];
    jwt.verify(bearerToken, privateKey, function (err, data) {
      if (!(err && typeof data === "undefined")) {
        req.user = { username: data.username, verified: true };
        next();
      }
    });
  }
  return res.sendStatus(403);
};
