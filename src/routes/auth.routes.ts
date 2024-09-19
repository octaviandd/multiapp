/** @format */

import express from "express";
import prisma from "prisma/prisma-client";

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
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    res.status(400).json({ message: "User not found" });
  } else {
    if (user.password === password) {
      req.session.userId = user.id;
      res.redirect("/home");
    } else {
      res.status(400).json({ message: "Incorrect password" });
    }
  }
});

router.post("/logout", (req, res) => {
  res.status(200).json({ message: "User logged out" });
});

export default router;
