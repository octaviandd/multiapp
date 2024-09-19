/** @format */

// express-session.d.ts
import session from "express-session";

declare module "express-session" {
  interface Session {
    userId: number; // or string, depending on your user ID type
  }
}
