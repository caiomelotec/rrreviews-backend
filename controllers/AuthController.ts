// The selected code with the fixes applied
import { Request, Response } from "express";
import UserModel from "../models/User";
import bcrypt from "bcryptjs";

const register = async (req: Request, res: Response) => {
  const { username, password, email } = req.body;

  try {
    const existingUser = await UserModel.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      if (existingUser.username === username) {
        return res.status(400).send({ message: "Username already exists" });
      } else if (existingUser.email === email) {
        return res.status(400).send({ message: "Email already exists" });
      }
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = await UserModel.create({
      username,
      password: hashedPassword,
      email,
    });

    if (user) {
      res.status(201).send({ message: "User created successfully" });
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500).send({ message: "Something went wrong" });
  }
};

export default { register };
