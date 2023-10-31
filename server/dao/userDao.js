import User from "../models/User.js";
import bcrypt from "bcrypt";

export async function findUserByUsername(username) {
  try {
    const user = await User.findOne({ username: username });
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createUser(username, password, nickname) {
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    await User.create({
      username: username,
      passwordHash: passwordHash,
      role: "registered user",
      nickname: nickname,
      level: 1,
      exp: 0,
    });
  } catch (error) {
    console.log(error);
    throw new Error("User creation failed.");
  }
}
