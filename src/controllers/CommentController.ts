import { Request, Response } from "express";
import CommentModel from "../models/Comment";

const createComment = async (req: Request, res: Response) => {
  const { text, gameId, userId } = req.body;

  try {
    const comment = await CommentModel.create({ gameId, text, userId });

    if (comment) {
      return res.status(201).send({ message: "Comment created successfully" });
    }

    if (!comment) {
      return res.status(400).send({ message: "Error by creating comment" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Something went wrong" });
  }
};

const fetchComments = async (req: Request, res: Response) => {
  const { gameId } = req.params;

  try {
    const comments = await CommentModel.find({ gameId });

    if (comments) {
      return res.status(200).send(comments);
    }

    if (!comments) {
      return res
        .status(404)
        .send({ message: "No comments found for this game" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Something went wrong" });
  }
};
