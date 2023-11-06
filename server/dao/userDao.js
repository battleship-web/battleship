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
      // user game stats
      numOfRoundsPlayed: 0,
      numOfRoundsWon: 0,
      records: []
    });
  } catch (error) {
    console.log(error);
    throw new Error("User creation failed.");
  }
}

export async function setUserProfilePicture(username, profilePicture) {
  try {
    await User.updateOne({ username: username }, { $set: { profilePicture: profilePicture } });
  } catch (error) {
    console.log(error);
    throw new Error("User set profile picture failed.");
  }
}

export async function incrementNumOfRoundsPlayed(username) {
  try {
    await User.updateOne({ username: username }, { $inc: { numOfRoundsPlayed: 1 } });
  } catch (error) {
    console.log(error);
    throw new Error("User increment number of rounds played failed.");
  }
}

export async function incrementNumOfRoundsWon(username) {
  try {
    await User.updateOne({ username: username }, { $inc: { numOfRoundsWon: 1 } });
  } catch (error) {
    console.log(error);
    throw new Error("User increment number of rounds won failed.");
  }
}

export async function getAllUsersArr() {
  try {
    return await User.find({});
  } catch (error) {
    console.log(error);
    throw new Error("Get all users array failed.");
  }
}

export async function pushGameRecord(username, gameRecord) {
  try {
    await User.updateOne({ username: username }, { $push: { records: gameRecord } }); // gameRecord object should match gameRecord schema
  } catch (error) {
    console.log(error);
    throw new Error("Push user game record failed.");
  }
}

export async function getGameRecordsArr(username) {
  try {
    return (await User.findOne({ username: username })).records;
  } catch (error) {
    console.log(error);
    throw new Error("Get user game records failed.");
  }
}
