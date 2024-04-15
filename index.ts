/** @format */

import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import passport from "passport";
import OAuth2 from "passport-oauth2";
import session from "express-session";

const OAuth2Strategy = OAuth2.Strategy;

dotenv.config();

const app: Express = express();

app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
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
  console.dir(allUsers, { depth: null });
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

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.get("/api/fitness", (req: Request, res: Response) => {
  res.send("Fitness data");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
