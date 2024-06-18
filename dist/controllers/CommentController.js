"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Comment_1 = __importDefault(require("../models/Comment"));
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { text, gameId, userId } = req.body;
    try {
        const comment = yield Comment_1.default.create({ gameId, text, userId });
        if (comment) {
            return res.status(201).send({ message: "Comment created successfully" });
        }
        if (!comment) {
            return res.status(400).send({ message: "Error by creating comment" });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Something went wrong" });
    }
});
const fetchComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { gameId } = req.params;
    try {
        const comments = yield Comment_1.default.find({ gameId });
        if (comments) {
            return res.status(200).send(comments);
        }
        if (!comments) {
            return res
                .status(404)
                .send({ message: "No comments found for this game" });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).send({ message: "Something went wrong" });
    }
});
exports.default = { createComment, fetchComments };
