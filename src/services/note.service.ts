/** @format */

import prisma from "prisma/prisma-client";
import { Note } from "src/types/note";

const getNote = async (noteId: string) => {
  const note = await prisma.note.findUnique({
    where: { id: Number(noteId) },
  });

  if (!note) {
    throw new Error("Note not found");
  }

  return note;
};

const updateNote = async (noteId: string, data: Partial<Note>) => {
  const updatedNote = await prisma.note.update({
    where: { id: Number(noteId) },
    data,
  });

  return updatedNote;
};

const deleteNote = async (noteId: string) => {
  const deletedNote = await prisma.note.delete({
    where: { id: Number(noteId) },
  });

  return deletedNote;
};

const createNote = async (data: Partial<Note>) => {
  const createdNote = await prisma.note.create({
    data,
  });

  return createdNote;
};

export default {
  getNote,
  updateNote,
  deleteNote,
  createNote,
};
