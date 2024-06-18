import express, { Request, Response } from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/AuthRoutes";
import commentRoutes from "./routes/CommentRoutes";
import session from "express-session";
const MongoStore = require("connect-mongodb-session")(session);

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

// express session
const store = new MongoStore({
  uri: "mongodb://localhost:27017/rrreviews",
  collection: "sessions",
  expires: 12 * 60 * 60 * 1000,
});

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello World");
});

app.use("/api/auth", authRoutes);
app.use("/api/posts", commentRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
