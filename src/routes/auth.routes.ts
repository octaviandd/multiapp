/** @format */

import express from "express";
import prisma from "../../prisma/prisma-client";
import bcrypt from "bcrypt";

const router = express.Router();

// Route for user registration
router.post("/register", async (req, res) => {
  const { email, password, first_name, last_name } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user) {
      res.status(400).json({ message: "User already exists" });
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
      });
      req.session.userId = newUser.id;
      res.status(201).json(newUser);
    }
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
});

// Route for user login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    req.session.userId = user.id;
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
});

router.post("/logout", (req, res) => {
  req.session.destroy(() => {});
  res.status(200).json({ message: "User logged out" });
});

router.get("/check-auth", (req, res) => {
  if (req.session.userId) {
    return res.status(200).json({ authenticated: true });
  } else {
    return res.status(401).json({ authenticated: false });
  }
});

export default router;
