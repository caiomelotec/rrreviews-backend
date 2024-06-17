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
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, email } = req.body;
    try {
        const existingUser = yield User_1.default.findOne({
            $or: [{ email }, { username }],
        });
        if (existingUser) {
            if (existingUser.username === username) {
                return res.status(400).send({ message: "Username already exists" });
            }
            else if (existingUser.email === email) {
                return res.status(400).send({ message: "Email already exists" });
            }
        }
        const hashedPassword = bcryptjs_1.default.hashSync(password, 10);
        const user = yield User_1.default.create({
            username,
            password: hashedPassword,
            email,
        });
        if (user) {
            res.status(201).send({ message: "User created successfully" });
        }
    }
    catch (err) {
        console.log(err);
        res.sendStatus(500).send({ message: "Something went wrong" });
    }
});
exports.default = { register };
