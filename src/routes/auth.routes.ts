/** @format */

import express from "express";
import prisma from "../../prisma/prisma-client";

const router = express.Router();

// Route for user registration
router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (user) {
    res.status(400).json({ message: "User already exists" });
  } else {
    const newUser = await prisma.user.create({
      data: {
        email,
        password,
        username: "", // Add a username property with a default value
        role: "", // Add a role property with a default value
      },
    });
    res.status(201).json(newUser);
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

    if (user.password !== password) {
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

export default router;
