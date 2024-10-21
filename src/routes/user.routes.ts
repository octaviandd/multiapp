/** @format */

import express from "express";
// import userController from "../controllers/user.controller";
import { withAuth } from "../middleware/auth.middleware";

const router = express.Router();

// router.get("/me", withAuth, userController.getUserFromSession);
// router.get("/:id", withAuth, userController.getUser);

export default router;
