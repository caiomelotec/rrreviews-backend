import express, { Request, Response } from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/AuthRoutes";
import session from "express-session";
import { MongoDBStore } from "connect-mongodb-session";

const app = express();
// connecting to the database
mongoose
  .connect("mongodb://localhost:27017/rrreviews")
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });

const store = new MongoDBStore({
  uri: "mongodb://localhost:27017/rrreviews",
  collection: "mySessions",
  expires: 1000 * 60 * 60 * 24,
});

const sessionMiddleware = session({
  secret: "secret_key", // secret key
  resave: false,
  saveUninitialized: false,
  store: store, // Use the MongoDBStore instance
});

app.use(sessionMiddleware);

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello World");
});

app.use("/api/auth", authRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
