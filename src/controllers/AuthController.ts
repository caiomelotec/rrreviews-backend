// The selected code with the fixes applied
import { Request, Response } from "express";
import UserModel from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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

const login = async (req: Request, res: Response) => {
  const userCred = req.body;

  try {
    const user = await UserModel.findOne({ email: userCred.email });

    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }

    if (user) {
      const { _id, username, email, password } = user;

      const checkPassword = bcrypt.compareSync(userCred.password, password);

      if (!checkPassword) {
        return res.status(400).send({ message: "Invalid password" });
      }

      const token = jwt.sign({ _id, username, email }, "key");

      if (!token) {
        console.log(token);
        console.log("error genarating token");
        return res.status(400).send({ message: "Something went wrong" });
      }
      if (checkPassword) {
        await UserModel.findOneAndUpdate(
          { _id: _id }, // Filter to find the document
          { $set: { sessionToken: token.toString() } }, // Update operation
          { new: true }
        );

        res.status(200).send({
          message: "User logged in successfully",
          userInfo: {
            userId: _id,
            username,
            email,
          },
        });
      }
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500).send({ message: "Something went wrong" });
  }
};

export default { register, login };
