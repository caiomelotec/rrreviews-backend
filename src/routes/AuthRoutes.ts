import express from "express";
const router = express.Router();

import AuthController from "../controllers/AuthController";

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/logout", AuthController.logout);

export default router;
