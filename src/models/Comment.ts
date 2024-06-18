import { Schema, model } from "mongoose";

const commentSchema = new Schema(
  {
    text: { type: String, required: true },
    userId: { type: Schema.ObjectId, ref: "users", required: true },
  },
  { timestamps: true }
);

export default model("Comment", commentSchema);
