/** @format */

import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import session from "express-session";
import userRoutes from "./src/routes/user.routes";
import authRoutes from "./src/routes/auth.routes";
// import boardRoutes from "./src/routes/board.routes";
// import transactionRoutes from "./src/routes/transaction.routes";
// import notesRoutes from "./src/routes/notes.routes";

dotenv.config();

const app: Express = express();
export const router = express.Router();
const prisma = new PrismaClient();

app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);
app.use(express.json());
app.use(cors());

app.use("/users", userRoutes);
app.use("/auth", authRoutes);
// app.use("/boards", boardRoutes);
// app.use("/transactions", transactionRoutes);
// app.use("/notes", notesRoutes);

const port = 8000 || process.env.PORT;

async function main() {}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

app.use("/", router);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
