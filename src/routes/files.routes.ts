
import express from "express";
import { withAuth } from "../middleware/auth.middleware";
import FilesController from "../controllers/files.controller";
import multer from "multer";
import multerS3 from "multer-s3";
import {
  S3Client,
} from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: process.env.AWS_S3_REGION as string,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY as string,
  }
})

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME as string,
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      const uniqueFileName = Date.now().toString() + "-" + file.originalname;
      cb(null, uniqueFileName);
    }
  })
})

const router = express.Router();

// Apply auth middleware to all routes in this router
router.use(withAuth);

// Files Routes
router.post("/upload", upload.any(), FilesController.uploadFile);
router.delete("/delete/:fileName", FilesController.deleteFile);


export default router;