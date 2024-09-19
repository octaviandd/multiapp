/** @format */

import prisma from "../../prisma/prisma-client";
import { Request, Response } from "express";

const getBoards = async () => {
  const boards = await prisma.board.findMany();
  if (!boards) {
    throw new Error("Boards not found");
  }

  return boards;
};

const getBoard = async (boardId: string) => {
  const board = await prisma.board.findUnique({
    where: { id: Number(boardId) },
  });

  if (!board) {
    throw new Error("Board not found");
  }

  return board;
};

const createBoard = async (title: string, displayOrder: number) => {
  const board = await prisma.board.create({
    data: {
      title,
      displayOrder,
    },
  });

  return board;
};

const deleteBoard = async (boardId: string) => {
  const board = await prisma.board.delete({
    where: { id: Number(boardId) },
  });

  return true;
};

const updateBoard = async (boardId: string, title: string) => {
  const board = await prisma.board.update({
    where: { id: Number(boardId) },
    data: { title },
  });

  return board;
};

export default { getBoards, getBoard, createBoard, deleteBoard, updateBoard };
