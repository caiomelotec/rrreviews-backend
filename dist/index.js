"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const AuthRoutes_1 = __importDefault(require("./routes/AuthRoutes"));
const express_session_1 = __importDefault(require("express-session"));
const connect_mongodb_session_1 = require("connect-mongodb-session");
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
const store = new connect_mongodb_session_1.MongoDBStore({
    uri: "mongodb://localhost:27017/rrreviews",
    collection: "mySessions",
    expires: 1000 * 60 * 60 * 24,
});
const sessionMiddleware = (0, express_session_1.default)({
    secret: "secret_key", // secret key
    resave: false,
    saveUninitialized: false,
    store: store, // Use the MongoDBStore instance
});
app.use(sessionMiddleware);
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.status(200).send("Hello World");
});
app.use("/api/auth", AuthRoutes_1.default);
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
