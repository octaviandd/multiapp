/** @format */

import prisma from "../prisma/prisma-client";

import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  S3ServiceException,
} from "@aws-sdk/client-s3";

const uploadFile = async (files: any) => {
  const client = new S3Client({});
  console.log(files);

  const bucketName = process.env.AWS_BUCKET_NAME;
  Object.values(files).forEach(async (file: any) => {
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: file.originalname,
      Body: await file.buffer,
    });

    try {
      const response = await client.send(command);
      console.log(response);
    } catch (caught: any) {
      if (
        caught instanceof S3ServiceException &&
        caught.name === "EntityTooLarge"
      ) {
        console.error(
          `Error from S3 while uploading object to ${bucketName}. \
          The object was too large. To upload objects larger than 5GB, use the S3 console (160GB max) \
          or the multipart upload API (5TB max).`,
        );
      } else if (caught instanceof S3ServiceException) {
        console.error(
          `Error from S3 while uploading object to ${bucketName}.  ${caught.name}: ${caught.message}`,
        );
      } else {
        throw caught;
      }
    }
  });
};

const deleteFile = async (fileName: string) => {
  const s3Client = new S3Client({});

  const bucketName = process.env.AWS_BUCKET_NAME;

  const command = new DeleteObjectCommand({
    Bucket: bucketName,
    Key: fileName,
  });

  try {
    const response = await s3Client.send(command);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

export default {
  uploadFile,
  deleteFile,
};
