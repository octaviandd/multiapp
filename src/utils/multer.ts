import multer from "multer";
import multerS3 from "multer-s3";
import s3 from "./s3client";

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

export default upload;