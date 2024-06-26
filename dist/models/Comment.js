"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const commentSchema = new mongoose_1.Schema({
    gameId: { type: String, require: true },
    text: { type: String, required: true },
    userId: { type: mongoose_1.Schema.ObjectId, ref: "users", required: true },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Comment", commentSchema);
