
import express from "express";
import { withAuth } from "../middleware/auth.middleware";
import FilesController from "../controllers/files.controller";

const router = express.Router();

// Apply auth middleware to all routes in this router
router.use(withAuth);

// Files Routes
router.post("/files/upload", FilesController.uploadFile);
router.delete("files/delete/:fileName", FilesController.deleteFile);


export default router;