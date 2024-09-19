/** @format */

import express, { Request, Response } from "express";
import { getUser } from "../services/user.service";

const router = express.Router();

router.get("/get-user", async (req: Request, res: Response) => {
  try {
    const user = await getUser();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
});

// GET /users
router.get("/users", (req: Request, res: Response) => {
  // Your code here
});

// GET /users/:id
router.get("/users/:id", (req: Request, res: Response) => {
  // Your code here
});

// POST /users
router.post("/users", (req: Request, res: Response) => {
  // Your code here
});

// PUT /users/:id
router.put("/users/:id", (req: Request, res: Response) => {
  // Your code here
});

// DELETE /users/:id
router.delete("/users/:id", (req: Request, res: Response) => {
  // Your code here
});

export default router;
