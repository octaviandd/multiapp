/** @format */

import { Request, Response } from "express";
import BoardService from "../services/board.service";

const getBoards = async (req: Request, res: Response) => {
  try {
    const boards = await BoardService.getBoards();
    return res.status(200).json(boards);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getBoard = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const board = await BoardService.getBoard(id);

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
    const { title, displayOrder, temporaryId } = req.body;
    const board = await BoardService.createBoard(
      title,
      displayOrder,
      temporaryId
    );

    return res.status(201).json(board);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteBoard = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const board = await BoardService.deleteBoard(id);

    return res.status(200).json(board);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateBoard = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const board = await BoardService.updateBoard(id, title);

    return res.status(200).json(board);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const moveBoard = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { replacedBoardId, displayOrder, replacedBoardIndex } = req.body;
    const board = await BoardService.moveBoard(
      id,
      replacedBoardId,
      displayOrder,
      replacedBoardIndex
    );

    return res.status(200).json(board);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
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
