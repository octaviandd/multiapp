/** @format */

import prisma from "../../prisma/prisma-client";

const getBoards = async () => {
  try {
    const boards = await prisma.board.findMany({
      include: { tasks: true },
      orderBy: { displayOrder: "asc" },
    });
    return boards;
  } catch (error: any) {
    throw new Error("Boards not found: " + error.message);
  }
};

const getBoard = async (boardId: string) => {
  try {
    const board = await prisma.board.findUnique({
      where: { id: Number(boardId) },
      include: { tasks: true },
    });

    return board;
  } catch (error: any) {
    throw new Error("Board not found: " + error.message);
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
  } catch (error: any) {
    throw new Error("Failed to create board: " + error.message);
  }
};

const deleteBoard = async (boardId: string) => {
  console.log({ boardId });
  try {
    await prisma.task.deleteMany({
      where: { boardId: Number(boardId) },
    });

    const board = await prisma.board.delete({
      where: { id: Number(boardId) },
    });

    return true;
  } catch (error: any) {
    throw new Error("Failed to delete board: " + error.message);
  }
};

const updateBoard = async (boardId: string, title: string) => {
  try {
    const board = await prisma.board.update({
      where: { id: Number(boardId) },
      data: { title },
    });

    return board;
  } catch (error: any) {
    throw new Error("Failed to update board: " + error.message);
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
  } catch (error: any) {
    throw new Error("Failed to move board: " + error.message);
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
