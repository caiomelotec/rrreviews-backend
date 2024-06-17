import express, { Request, Response } from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/AuthRoutes";

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

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello World");
});

app.use("/api/auth", authRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
