/** @format */

import express, { Request, Response } from "express";
import userController from "../controllers/User.controller";
import { withAuth } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/me", withAuth, userController.getUserFromSession);

export default router;
