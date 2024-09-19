/** @format */

import express from "express";
import { withAuth } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/home", withAuth, (req, res) => {
  res.json({ message: "Hello, world!" });
});

export default router;
