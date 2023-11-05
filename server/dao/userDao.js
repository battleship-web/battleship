import User from "../models/User.js";
import bcrypt from "bcrypt";

export async function findUserByUsername(username) {
  try {
    const user = await User.findOne({ username: username });
    return user;
  } catch (error) {
    console.log(error);
    throw new Error("Error occurred when trying to find user.");
  }
}

export async function createUser(username, password, nickname, profilePicture) {
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    await User.create({
      username: username,
      passwordHash: passwordHash,
      role: "registered user",
      nickname: nickname,
      profilePicture: profilePicture,
      level: 1,
      exp: 0,
    });
  } catch (error) {
    console.log(error);
    throw new Error("User creation failed.");
  }
}

export async function setUserProfilePicture(username, profilePicture) {
  try {
    await User.updateOne(
      { username: username },
      { $set: { profilePicture: profilePicture } }
    );
  } catch (error) {
    console.log(error);
    throw new Error("User set profile picture failed.");
  }
}

export async function setLevelAndExp(user, level, exp) {
  try {
    if (!user) {
      return;
    }

    user.level = level;
    user.exp = exp;
    await user.save();
  } catch (error) {
    console.log(error);
    throw new Error("Fail to increase exp.");
  }
}
