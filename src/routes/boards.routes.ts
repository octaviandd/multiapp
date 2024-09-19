/** @format */

import express from "express";
import { requireAuth } from "../middleware/auth.middleware";
import {
  getBoards,
  getBoard,
  createBoard,
  updateBoard,
  deleteBoard,
} from "../controllers/board.controller";

const router = express.Router();

// Apply auth middleware to all routes in this router
router.use(requireAuth);

// GET /boards
router.get("/", getBoards);

// GET /boards/:id
router.get("/:id", getBoard);

// POST /boards
router.post("/", createBoard);

// PUT /boards/:id
router.put("/:id", updateBoard);

// DELETE /boards/:id
router.delete("/:id", deleteBoard);

export default router;
