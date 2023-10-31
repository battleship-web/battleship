import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  nickname: { type: String, required: true },
  username: { type: String, required: true },
  passwordHash: { type: String, required: true },
  role: { type: String, required: true },
  level: { type: Number, required: true },
  exp: { type: Number, required: true },
  profilePicture: String,
});

export default mongoose.model("User", userSchema);
