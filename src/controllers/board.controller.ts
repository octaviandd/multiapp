/** @format */

import { Request, Response } from "express";
import BoardService from "../services/board.service";

const getBoards = async (req: Request, res: Response) => {
  try {
    const boards = BoardService.getBoards();
    return res.status(200).json(boards);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getBoard = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const board = BoardService.getBoard(id);

    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    return res.status(200).json(board);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const createBoard = async (req: Request, res: Response) => {
  try {
    const { title, displayOrder } = req.body;
    const board = BoardService.createBoard(title, displayOrder);

    return res.status(201).json(board);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteBoard = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const board = BoardService.deleteBoard(id);

    return res.status(200).json(board);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateBoard = async (req: Request, res: Response) => {
  try {
    const { id, title } = req.body;
    const board = BoardService.updateBoard(id, title);

    return res.status(200).json(board);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default { getBoards, getBoard, createBoard, deleteBoard, updateBoard };
