/** @format */

import prisma from "../../prisma/prisma-client";
import { Transaction } from "../types/transaction";

const getTransaction = async (id: string) => {
  try {
    const transaction = await prisma.transaction.findUnique({
      where: { id: Number(id) },
    });

    return transaction;
  } catch (error: any) {
    throw new Error("Transaction not found: " + error.message);
  }
};

const updateTransaction = async (id: string, data: Partial<Transaction>) => {
  try {
    const updatedTransaction = await prisma.transaction.update({
      where: { id: Number(id) },
      data,
    });

    return updatedTransaction;
  } catch (error: any) {
    throw new Error("Transaction not found: " + error.message);
  }
};

const deleteTransaction = async (id: string) => {
  try {
    const transaction = await prisma.transaction.findUnique({
      where: { id: Number(id) },
    });

    return true;
  } catch (error: any) {
    throw new Error("Transaction not found: " + error.message);
  }
};

const createTransaction = async (data: Partial<Transaction>) => {
  try {
    const createdTransaction = await prisma.transaction.create({
      data,
    });

    return createdTransaction;
  } catch (error: any) {
    throw new Error("Failed to create transaction: " + error.message);
  }
};

export default {
  getTransaction,
  updateTransaction,
  deleteTransaction,
  createTransaction,
};
