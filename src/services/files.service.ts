/** @format */

import prisma from "../prisma/prisma-client";

const uploadFile = async (files: any) => {
  try {
    const newFiles = await prisma.file.createMany({
      data: files,
      skipDuplicates: true,
    });

    return newFiles;
  } catch (err: any){
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
  } catch (err: any){
    console.log("Error deleting file from database:", err);
  }
};

export default {
  uploadFile,
  deleteFile,
};
