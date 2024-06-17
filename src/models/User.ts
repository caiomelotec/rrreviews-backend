import mongoose, { Schema, model } from "mongoose";

// interface IUser {
//   _doc?: {
//     _id: mongoose.ObjectId;
//     username: string;
//     email: string;
//     password: string;
//   };
// }

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  sessionToken: { type: String },
});

export default model("User", userSchema);
