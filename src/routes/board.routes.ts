/** @format */

import express from "express";
import { withAuth } from "../middleware/auth.middleware";
import BoardController from "../controllers/board.controller";
import TaskController from "../controllers/task.controller";
import CommentController from "../controllers/comment.controller";
import LikesController from "../controllers/likes.controller";

const router = express.Router();

// Apply auth middleware to all routes in this router
router.use(withAuth);

// Board Routes
router.get("/get-boards", BoardController.getBoards);
router.get("/get-board/:id", BoardController.getBoard);
router.post("/create-board", BoardController.createBoard);
router.put("/update-board/:id", BoardController.updateBoard);
router.delete("/delete-board/:id", BoardController.deleteBoard);
router.post("/move-board/:id", BoardController.moveBoard);

// Task Routes (nested under boards)
router.get("/tasks", TaskController.getTasks);
router.get("/:boardId/tasks", TaskController.getTasks);
router.get("/tasks/:taskId", TaskController.getTask);
router.post("/:boardId/tasks", TaskController.createTask);
router.post("/:boardId/tasks/move-task/:taskId", TaskController.updateTask);
router.post("/tasks/:taskId", TaskController.updateTask);
router.delete("/tasks/delete-task/:taskId", TaskController.deleteTask);
router.post("/tasks/add-task-file/:fileId", TaskController.addTaskFile);
router.delete("/tasks/delete-task-file/:fileId", TaskController.deleteTaskFile);

// Comment Routes (nested under tasks)
router.get("/:id/tasks/:taskId/comments", CommentController.getComments);
router.get(
  "/:id/tasks/:taskId/comments/:commentId",
  CommentController.getComment
);
router.post("/tasks/:taskId/comments", CommentController.createComment);
router.delete(
  "/:id/tasks/:taskId/comments/:commentId",
  CommentController.deleteComment
);

// Likes Routes (nested under tasks)
router.get("/:id/tasks/:taskId/likes", LikesController.getTaskLikes);
router.post("/tasks/:taskId/likes", LikesController.createTaskLike);
router.delete("/likes/delete-like/:likeId", LikesController.deleteTaskLike);
router.get(
  "/:id/tasks/:taskId/comments/:commentId/likes",
  LikesController.getCommentLikes
);
router.post(
  "/tasks/:taskId/comments/:commentId/likes",
  LikesController.createCommentLike
);
router.delete(
  "/:id/tasks/:taskId/comments/:commentId/likes/:likeId",
  LikesController.deleteCommentLike
);

export default router;
