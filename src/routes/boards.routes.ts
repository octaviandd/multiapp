/** @format */

import express from "express";
import { withAuth } from "../middleware/auth.middleware";
import BoardController from "../controllers/board.controller";

const router = express.Router();

// Apply auth middleware to all routes in this router
router.use(withAuth);

// GET /boards
router.get("/", BoardController.getBoards);

// GET /boards/:id
router.get("/:id", BoardController.getBoard);

// POST /boards
router.post("/", BoardController.createBoard);

// PUT /boards/:id
router.put("/:id", BoardController.updateBoard);

// DELETE /boards/:id
router.delete("/:id", BoardController.deleteBoard);

export default router;
