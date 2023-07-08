import mongoose from "mongoose";
const User = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, default: 18 },
  gender: { type: String, default: "" },
  phone: { type: String, required: true, unique: true },
});
export default mongoose.model("User", User);
