/** @format */

import prisma from "../prisma/prisma-client";

import {
  S3Client,
  PutObjectCommand,
  CreateBucketCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

const uploadFile = async (file: any) => {
  const s3Client = new S3Client({});

  const bucketName = process.env.AWS_BUCKET_NAME || "taskify-bucket";

  await s3Client.send(
    new CreateBucketCommand({
      Bucket: bucketName,
    })
  );

  await s3Client.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: file.originalname,
      Body: file.buffer,
    })
  );
};

const deleteFile = async (fileName: string) => {
  const s3Client = new S3Client({});

  const bucketName = process.env.AWS_BUCKET_NAME || "taskify-bucket";

  await s3Client.send(
    new DeleteObjectCommand({
      Bucket: bucketName,
      Key: fileName,
    })
  );
};

export default {
  uploadFile,
  deleteFile,
};
