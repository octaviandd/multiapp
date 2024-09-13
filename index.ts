/** @format */

import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import session from "express-session";

dotenv.config();

const app: Express = express();
export const router = express.Router();

app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(express.json());
app.use(cors());
const port = 8000;

const prisma = new PrismaClient();

async function main() {
  const allUsers = await prisma.user.findMany({
    include: {
      profile: true,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

router.get("/api", (req: Request, res: Response) => {
  console.log('hit')
  res.send("Hello World!");
});

