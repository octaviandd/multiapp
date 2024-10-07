/** @format */

import TransactionController from "../services/transaction.service";
import { Request, Response } from "express";

const getTransactions = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    const transactions = await TransactionController.getTransactions();

    return res.status(200).json(transactions);
  } catch (error: any) {
    return res.status(500).json({ message: "Internal server error: " + error.message });
  }
};

const getTransaction = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const transaction = await TransactionController.getTransaction(id);


    return res.status(200).json(transaction);
  } catch (error: any) {
    return res.status(500).json({ message: "Internal server error: " + error.message });
  }
};

const createTransaction = async (req: Request, res: Response) => {
  try {
    const { content, taskId } = req.body;
    const currentUserId = (req.user as { id: string }).id;
    const transaction = await TransactionController.createTransaction(
      content,
      taskId,
      currentUserId
    );

    return res.status(201).json(transaction);
  } catch (error: any) {
    return res.status(500).json({ message: "Internal server error: " + error.message });
  }
};

const deleteTransaction = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const transaction = await TransactionController.deleteTransaction(id);

    return res.status(200).json(transaction);
  } catch (error: any) {
    return res.status(500).json({ message: "Internal server error: " + error.message });
  }
};

const updateTransaction = async (req: Request, res: Response) => {
  try {
    const { id, content } = req.body;
    const transaction = await TransactionController.updateTransaction(id, content);

    return res.status(200).json(transaction);
  } catch (error: any) {
    return res.status(500).json({ message: "Internal server error: " + error.message });
  }
};

export default {
  getTransactions,
  getTransaction,
  createTransaction,
  deleteTransaction,
  updateTransaction,
};
