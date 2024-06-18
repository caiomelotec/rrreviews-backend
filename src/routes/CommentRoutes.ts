import express from "express";

const router = express.Router();

import CommentController from "../controllers/CommentController";

router.post("/comment", CommentController.createComment);
router.get("/comments/:gameId", CommentController.createComment);

export default router;
