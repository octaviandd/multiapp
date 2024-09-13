/** @format */
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import prisma from "../../prisma/prisma-client";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    let token = null;
    if (email && password) {
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      let passwordHash =
        "$2b$10$L9nYrE48INGkPkdPPE3ABOXx.CXTCTKJadW3Cu35iirZHZAHHBzCi";
      const privateKey: Secret = "secret";

      let match = await bcrypt.compare(password, passwordHash);
      if (user && match)
        token = jwt.sign({ email }, privateKey, {
          expiresIn: "1h",
        });
    }
    if (token) return res.json({ token: token });
    return res.sendStatus(401);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};
