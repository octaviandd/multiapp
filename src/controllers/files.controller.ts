/** @format */

import FilesService from "../services/files.service";
import { Request, Response } from "express";

const getFiles = async (req: Request, res: Response) => {
  try {
    const files = await FilesService.getFiles();

    res.status(200).json(files);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Internal server error: " + error.message });
  }
};

const uploadFile = async (req: Request, res: Response) => {
  try {
    const fileUrls = (req.files as any[]).map((file) => ({
      fieldName: file.fieldname,
      url: file.location,
      type: file.mimetype,
    }));

    const newFiles = fileUrls.map((file: any) => ({
      title: file.fieldName,
      url: file.url,
      type: file.type,
    }));

    const dbFiles = await FilesService.uploadFile(newFiles);

    res.status(201).json({
      message: "Files uploaded successfully",
      files: dbFiles,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Internal server error: " + error.message });
  }
};

const deleteFile = async (req: Request, res: Response) => {
  try {
    const { fileId } = req.params;
    await FilesService.deleteFile(Number(fileId));

    return res.status(200).json({ message: "File deleted" });
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Internal server error: " + error.message });
  }
};

const searchFiles = async (req: Request, res: Response) => {
  try {
    const { q } = req.query;
    const files = await FilesService.searchFiles(q as string);

    res.status(200).json(files);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Internal server error: " + error.message });
  }
};

export default {
  uploadFile,
  deleteFile,
  getFiles,
  searchFiles,
};
