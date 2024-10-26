/** @format */

import prisma from "../prisma/prisma-client";

const getFiles = async () => {
  try {
    const files = await prisma.file.findMany();

    return files;
  } catch (err: any) {
    console.log("Error fetching files from database:", err);
  }
};

const uploadFile = async (files: any) => {
  try {
    const newFiles = await prisma.file.createMany({
      data: files,
      skipDuplicates: true,
    });

    if (newFiles.count == 0) return [];

    const insertedFiles = await prisma.file.findMany({
      where: {
        title: {
          in: files.map((file: any) => file.title),
        },
      },
    });

    return insertedFiles;
  } catch (err: any) {
    console.log("Error uploading files to database:", err);
  }
};

const deleteFile = async (fileId: number) => {
  try {
    await prisma.file.delete({
      where: {
        id: fileId,
      },
    });

    return true;
  } catch (err: any) {
    console.log("Error deleting file from database:", err);
  }
};

const searchFiles = async (query: string) => {
  try {
    const files = await prisma.file.findMany({
      where: {
        title: {
          contains: query,
        },
      },
    });

    return files;
  } catch (err: any) {
    console.log("Error searching files in database:", err);
  }
};

export default {
  uploadFile,
  deleteFile,
  getFiles,
  searchFiles,
};
