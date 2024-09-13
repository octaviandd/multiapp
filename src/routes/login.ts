/** @format */

import prisma from "../../prisma/prisma-client";
import { Request, Response } from "express";
import { router } from "../../index";

router.post("/api/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const main = async () => {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      // return error, user not exists
      const newUser = await prisma.user.create({
        data: {
          email,
          password,
        },
      });

      return newUser;
    }
  };

  main()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
});
