/** @format */

import express from "express";
import userController from "../controllers/user.controller";

const router = express.Router();

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.post("/logout", userController.logoutUser);
router.get("/user-completed-tasks/", userController.getUserCompletedTasks);
router.get("/check-auth", userController.getUserFromSession);

export default router;
