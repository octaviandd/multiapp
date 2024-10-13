/** @format */

import session from "express-session";
import { User } from "./user";

declare module "express-session" {
  interface Session {
    user: User;
  }
}
