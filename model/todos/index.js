import mongoose from "mongoose";

const Todo = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  owner: { type: mongoose.ObjectId, ref: "User" },
});
export default mongoose.model("Todo", Todo);
