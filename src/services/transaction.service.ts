/** @format */

import prisma from "prisma/prisma-client";
import { Transaction } from "src/types/transaction";

const getTransaction = async (id: string) => {
  const transaction = await prisma.transaction.findUnique({
    where: { id: Number(id) },
  });

  if (!transaction) {
    throw new Error("Transaction not found");
  }

  return transaction;
};

const updateTransaction = async (id: string, data: Partial<Transaction>) => {
  const updatedTransaction = await prisma.transaction.update({
    where: { id: Number(id) },
    data,
  });

  return updatedTransaction;
};

const deleteTransaction = async (id: string) => {
  const deletedTransaction = await prisma.transaction.delete({
    where: { id: Number(id) },
  });

  return deletedTransaction;
};

const createTransaction = async (data: Partial<Transaction>) => {
  const createdTransaction = await prisma.transaction.create({
    data,
  });

  return createdTransaction;
};

export default {
  getTransaction,
  updateTransaction,
  deleteTransaction,
  createTransaction,
};
