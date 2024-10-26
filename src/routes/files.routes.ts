/** @format */

import express from "express";
import { withAuth } from "../middleware/auth.middleware";
import FilesController from "../controllers/files.controller";
import upload from "../utils/multer";

const router = express.Router();

// Apply auth middleware to all routes in this router
router.use(withAuth);

// Files Routes
router.get("/", FilesController.getFiles);
router.post("/upload", upload.any(), FilesController.uploadFile);
router.delete("/delete/:fileId", FilesController.deleteFile);
router.get("/search", FilesController.searchFiles);

export default router;
