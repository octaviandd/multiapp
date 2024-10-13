/** @format */

import { User } from "@prisma/client";

type Transaction = {
  id: string;
  amount: number;
  user: User;
  date: Date;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};

export type { Transaction };
