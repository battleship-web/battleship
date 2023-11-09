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
      // user game stats
      numOfRoundsPlayed: 0,
      numOfRoundsWon: 0,
      records: [],
    });
  } catch (error) {
    console.log(error);
    throw new Error("User creation failed.");
  }
}

export async function setUserProfilePicture(username, profilePicture) {
  try {
    const user = await User.findOne({ username: username });
    user.profilePicture = profilePicture;
    await user.save();
  } catch (error) {
    console.log(error);
    throw new Error("User set profile picture failed.");
  }
}

export async function setUserNickname(username, nickname) {
  try {
    const user = await User.findOne({ username: username });
    user.nickname = nickname;
    await user.save();
  } catch (error) {
    console.log(error);
    throw new Error("User set nickname failed.");
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
export async function incrementNumOfRoundsPlayed(username) {
  try {
    const user = await User.findOne({ username: username });
    user.numOfRoundsPlayed = user.numOfRoundsPlayed + 1;
    await user.save();
  } catch (error) {
    console.log(error);
    throw new Error("User increment number of rounds played failed.");
  }
}

export async function incrementNumOfRoundsWon(username) {
  try {
    const user = await User.findOne({ username: username });
    user.numOfRoundsWon = user.numOfRoundsWon + 1;
    await user.save();
  } catch (error) {
    console.log(error);
    throw new Error("User increment number of rounds won failed.");
  }
}

export async function getAllUsersArr() {
  try {
    let allUsersArr = await User.find({});
    allUsersArr = allUsersArr.filter((user) => {
      return user.role !== "admin";
    });
    // omit password hash, exp, and battle records from data to send
    return allUsersArr.map((user) => {
      delete user.passwordHash;
      delete user.exp;
      delete user.records;
      return user;
    });
  } catch (error) {
    console.log(error);
    throw new Error("Get all users array failed.");
  }
}

export async function pushGameRecord(username, gameRecord) {
  try {
    const user = await User.findOne({ username: username });
    user.records.unshift(gameRecord);
    // gameRecord object should match gameRecord schema
    await user.save();
  } catch (error) {
    console.log(error);
    throw new Error("Push user game record failed.");
  }
}

export async function getGameRecordsArr(username) {
  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      throw new Error("User not found");
    }
    return user.records;
  } catch (error) {
    console.log(error);
    throw new Error("Get user game records failed.");
  }
}
