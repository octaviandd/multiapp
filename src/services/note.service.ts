/** @format */

import prisma from "../../prisma/prisma-client";
import { Note } from "../types/note";

const getNotes = async () => {
  try {
    const notes = await prisma.note.findMany();

    return notes;
  } catch (error: any) {
    throw new Error("Notes not found: " + error.message);
  }
}

const getNote = async (noteId: string) => {
  try {
    const note = await prisma.note.findUnique({
      where: { id: Number(noteId) },
    });

    return note;
  } catch (error: any) {
    throw new Error("Note not found: " + error.message);
  }
};

const updateNote = async (noteId: string, data: Partial<Note>) => {
  try {
    const updatedNote = await prisma.note.update({
      where: { id: Number(noteId) },
      data,
    });

    return updatedNote;
  } catch (error: any) {
    throw new Error("Note not found: " + error.message);
  }
};

const deleteNote = async (noteId: string) => {
  try {
    const deletedNote = await prisma.note.delete({
      where: { id: Number(noteId) },
    });

    return true;
  } catch (error: any) {
    throw new Error("Note not found: " + error.message);
  }
};

// const createNote = async (data: Partial<Note>) => {
//   try {
//     const createdNote = await prisma.note.create({
//       data,
//     });

//     return createdNote;
//   } catch (error: any) {
//     throw new Error("Failed to create note: " + error.message);
//   }
// };

export default {
  getNotes,
  getNote,
  updateNote,
  deleteNote,
  // createNote,
};
