/** @format */

import FilesService from "../services/files.service";
import { Request, Response } from "express";

const uploadFile = async (req: Request, res: Response) => {
  try {
    const { file } = req.body;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    await FilesService.uploadFile(file);

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
