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
import bodyParser from "body-parser";
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
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

app.use("/api/users", bodyParser.json(), userRoutes);
app.use("/api/auth", bodyParser.json(), authRoutes);
app.use("/api/boards", bodyParser.json(), boardRoutes);
app.use("/api/home", bodyParser.json(), homeRoutes);
app.use("/api/files", filesRoutes);

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

app.get("/api", withAuth, (req: Request, res: Response) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
