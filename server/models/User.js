import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  nickname: String,
  username: String,
  passwordHash: String,
  role: String,
});

export default mongoose.model("User", userSchema);
