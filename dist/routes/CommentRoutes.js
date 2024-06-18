"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const CommentController_1 = __importDefault(require("../controllers/CommentController"));
router.post("/comment", CommentController_1.default.createComment);
router.get("/comments/:gameId", CommentController_1.default.fetchComments);
exports.default = router;
