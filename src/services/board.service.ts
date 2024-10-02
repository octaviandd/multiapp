/** @format */

import prisma from "../../prisma/prisma-client";

const getBoards = async () => {
  try {
    const boards = await prisma.board.findMany({
      include: { tasks: true },
      orderBy: { displayOrder: "asc" },
    });
    return boards;
  } catch (error) {
    throw new Error("Boards not found");
  }
};

const getBoard = async (boardId: string) => {
  try {
    const board = await prisma.board.findUnique({
      where: { id: Number(boardId) },
      include: { tasks: true },
    });

    if (!board) {
      throw new Error("Board not found");
    }

    return board;
  } catch (error) {
    throw new Error("Board not found");
  }
};

const createBoard = async (title: string, displayOrder: number) => {
  try {
    const board = await prisma.board.create({
      data: {
        title,
        displayOrder,
      },
    });

    return board;
  } catch (error) {
    throw new Error("Failed to create board");
  }
};

const deleteBoard = async (boardId: string) => {
  try {
    const board = await prisma.board.delete({
      where: { id: Number(boardId) },
    });

    return board;
  } catch (error) {
    throw new Error("Failed to delete board");
  }
};

const updateBoard = async (boardId: string, title: string) => {
  try {
    const board = await prisma.board.update({
      where: { id: Number(boardId) },
      data: { title },
    });

    return board;
  } catch (error) {
    throw new Error("Failed to update board");
  }
};

const moveBoard = async (
  boardId: string,
  replacedBoardId: number,
  displayOrder: number,
  replacedBoardIndex: number
) => {
  try {
    const board = await prisma.board.update({
      where: { id: Number(boardId) },
      data: { displayOrder },
    });

    const replacedBoard = await prisma.board.update({
      where: { id: replacedBoardId },
      data: { displayOrder: replacedBoardIndex },
    });

    return board;
  } catch (error) {
    throw new Error("Failed to move board");
  }
};

export default {
  getBoards,
  getBoard,
  createBoard,
  deleteBoard,
  updateBoard,
  moveBoard,
};
