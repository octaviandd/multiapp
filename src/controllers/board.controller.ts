/** @format */

import prisma from "prisma/prisma-client";

export const getBoards = async (req: Request, res: Response) => {
  try {
    const boards = await prisma.board.findMany();
    return res.status(200).json(boards);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getBoard = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const board = await prisma.board.findUnique({
      where: { id },
    });

    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    return res.status(200).json(board);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const createBoard = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;
    const board = await prisma.board.create({
      data: {
        title,
      },
    });

    return res.status(201).json(board);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteBoard = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const board = await prisma.board.delete({
      where: { id },
    });

    return res.status(200).json(board);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateBoard = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const board = await prisma.board.update({
      where: { id },
      data: { title },
    });

    return res.status(200).json(board);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
