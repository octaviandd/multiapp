/** @format */

import express from "express";
import { withAuth } from "../middleware/auth.middleware";
import BoardController from "../controllers/board.controller";
import TaskController from "../controllers/task.controller";
import CommentController from "src/controllers/comment.controller";

const router = express.Router();

// Apply auth middleware to all routes in this router
router.use(withAuth);

// Board Routes
router.get("/", BoardController.getBoards);
router.get("/:id", BoardController.getBoard);
router.post("/", BoardController.createBoard);
router.put("/:id", BoardController.updateBoard);
router.delete("/:id", BoardController.deleteBoard);

// Task Routes (nested under boards)
router.get("/:id/tasks", TaskController.getTasks);
router.get("/:id/tasks/:taskId", TaskController.getTask);
router.post("/:id/tasks", TaskController.createTask);
router.put("/:id/tasks/:taskId", TaskController.updateTask);
router.delete("/:id/tasks/:taskId", TaskController.deleteTask);

// Comment Routes (nested under tasks)
router.get("/:id/tasks/:taskId/comments", CommentController.getComments);
router.get("/:id/tasks/:taskId/comments/:commentId", CommentController.getComment);
router.post("/:id/tasks/:taskId/comments", CommentController.createComment);
router.put("/:id/tasks/:taskId/comments/:commentId", CommentController.updateComment);
router.delete("/:id/tasks/:taskId/comments/:commentId", CommentController.deleteComment);

export default router;
