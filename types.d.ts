import "express-session";

declare module "express-session" {
  interface SessionData {
    username: string;
    token: string;
    userId: string;
  }
}
