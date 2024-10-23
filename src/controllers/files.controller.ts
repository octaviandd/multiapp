/** @format */

import FilesService from "../services/files.service";
import { Request, Response } from "express";

declare global {
  namespace Express {
    export interface Request {
      files?: Array<{ filename: string, filePath: string }>; // or whatever type you need for the files
    }
  }
}

const uploadFile = async (req: Request, res: Response) => {
  try {
    const files = req.files;
    await FilesService.uploadFile(files);

    return res.status(201).json({ message: "File uploaded" });
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Internal server error: " + error.message });
  }
};

const deleteFile = async (req: Request, res: Response) => {
  try {
    const { fileName } = req.params;
    await FilesService.deleteFile(fileName);

    return res.status(200).json({ message: "File deleted" });
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Internal server error: " + error.message });
  }
};

export default {
  uploadFile,
  deleteFile,
};
