/** @format */

import NoteService from "../services/note.service";
import { Request, Response } from "express";

const getNotes = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    const notes = await NoteService.getNotes(taskId);

    return res.status(200).json(notes);
  } catch (error: any) {
    return res.status(500).json({ message: "Internal server error: " + error.message });
  }
};

const getNote = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const note = await NoteService.getNote(id);


    return res.status(200).json(note);
  } catch (error: any) {
    return res.status(500).json({ message: "Internal server error: " + error.message });
  }
};

const createNote = async (req: Request, res: Response) => {
  try {
    const { content, taskId } = req.body;
    const currentUserId = (req.user as { id: string }).id;
    const note = await NoteService.createNote(
      content,
      taskId,
      currentUserId
    );

    return res.status(201).json(note);
  } catch (error: any) {
    return res.status(500).json({ message: "Internal server error: " + error.message });
  }
};

const deleteNote = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const note = await NoteService.deleteNote(id);

    return res.status(200).json(note);
  } catch (error: any) {
    return res.status(500).json({ message: "Internal server error: " + error.message });
  }
};

const updateNote = async (req: Request, res: Response) => {
  try {
    const { id, content } = req.body;
    const note = await NoteService.updateNote(id, content);

    return res.status(200).json(note);
  } catch (error: any) {
    return res.status(500).json({ message: "Internal server error: " + error.message });
  }
};

export default {
  getNotes,
  getNote,
  createNote,
  deleteNote,
  updateNote,
};
