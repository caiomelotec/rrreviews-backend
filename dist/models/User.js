"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// interface IUser {
//   _doc?: {
//     _id: mongoose.ObjectId;
//     username: string;
//     email: string;
//     password: string;
//   };
// }
const userSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    sessionToken: { type: String },
});
exports.default = (0, mongoose_1.model)("User", userSchema);
