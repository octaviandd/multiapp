/** @format */

import express from "express";
import userController from "../controllers/user.controller";

const router = express.Router();

router.get("/register", userController.registerUser);
router.get("/login", userController.loginUser);
router.get("/logout", userController.logoutUser);
router.get("/check-auth", userController.getUserFromSession);

export default router;
