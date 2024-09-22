/** @format */

import prisma from "../../prisma/prisma-client";

const getBoards = async () => {
  try {
    const boards = await prisma.board.findMany({
      include: { tasks: true },
    });
    return boards;
  } catch (error) {
    throw new Error("Boards not found");
  }
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
