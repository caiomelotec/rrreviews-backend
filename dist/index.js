"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const AuthRoutes_1 = __importDefault(require("./routes/AuthRoutes"));
const app = (0, express_1.default)();
// connecting to the database
mongoose_1.default
    .connect("mongodb://localhost:27017/rrreviews")
    .then(() => {
    console.log("Database connected");
})
    .catch((err) => {
    console.log(err);
});
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.status(200).send("Hello World");
});
app.use("/api/auth", AuthRoutes_1.default);
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
