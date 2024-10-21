/** @format */

import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import session from "express-session";
import userRoutes from "./src/routes/user.routes";
import authRoutes from "./src/routes/auth.routes";
import boardRoutes from "./src/routes/board.routes";
import homeRoutes from "./src/routes/home.routes";
import filesRoutes from "./src/routes/files.routes";
import { withAuth } from "./src/middleware/auth.middleware";

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

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/boards", boardRoutes);
app.use("/home", homeRoutes);
app.use("/files", filesRoutes);

const port = process.env.PORT || 8000;

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

app.get("/", withAuth, (req: Request, res: Response) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
