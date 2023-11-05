import redisClient from "../config/redisClient.js";
import { findUserByUsername, setLevelAndExp } from "../dao/userDao.js";

function calculateExpGainFromGameResults(player1Won, player2Won) {
  const player1ExpGain = 30 * player1Won + 10 * player2Won;
  const player2ExpGain = 30 * player2Won + 10 * player1Won;
  return [player1ExpGain, player2ExpGain];
}

function calculateLevelFromExpGain(level, exp, expGain) {
  exp += expGain;
  if (exp >= 100) {
    exp -= 100;
    level += 1;
  }
  return [level, exp];
}

export async function updateExp(
  io,
  gameId,
  player1SocketId,
  player2SocketId,
  p1Score,
  p2Score
) {
  try {
    const p1Role = await redisClient.hGet(
      `socketId:${player1SocketId}`,
      "role"
    );
    const p2Role = await redisClient.hGet(
      `socketId:${player2SocketId}`,
      "role"
    );
    if (p1Role === "guest" && p2Role === "guest") {
      return;
    }
    if (!p1Score) {
      p1Score = await redisClient.hGet(`game:${gameId}`, "player1Score");
    }
    if (!p2Score) {
      p2Score = await redisClient.hGet(`game:${gameId}`, "player2Score");
    }
    const [p1ExpGain, p2ExpGain] = calculateExpGainFromGameResults(
      p1Score,
      p2Score
    );

    if (p1Role === "registered user") {
      const p1Username = await redisClient.hGet(
        `socketId:${player1SocketId}`,
        "username"
      );
      const user = await findUserByUsername(p1Username);
      if (!user) {
        // should be able to find, if cannot find then something is wrong
        throw new Error("User not found.");
      }

      const [p1Level, p1Exp] = calculateLevelFromExpGain(
        user.level,
        user.exp,
        p1ExpGain
      );
      const promise1 = setLevelAndExp(user, p1Level, p1Exp);
      const promise2 = redisClient.hSet(
        `socketId:${player1SocketId}`,
        "level",
        p1Level
      );
      const promise3 = redisClient.hSet(
        `socketId:${player1SocketId}`,
        "exp",
        p1Exp
      );
      await Promise.all([promise1, promise2, promise3]);
      io.to(player1SocketId).emit("levelInfo", { level: p1Level, exp: p1Exp });
    }
    if (p2Role === "registered user") {
      const p2Username = await redisClient.hGet(
        `socketId:${player2SocketId}`,
        "username"
      );
      const user = await findUserByUsername(p2Username);
      if (!user) {
        // should be able to find, if cannot find then something is wrong
        throw new Error("User not found.");
      }

      const [p2Level, p2Exp] = calculateLevelFromExpGain(
        user.level,
        user.exp,
        p2ExpGain
      );
      const promise1 = setLevelAndExp(user, p2Level, p2Exp);
      const promise2 = redisClient.hSet(
        `socketId:${player2SocketId}`,
        "level",
        p2Level
      );
      const promise3 = redisClient.hSet(
        `socketId:${player2SocketId}`,
        "exp",
        p2Exp
      );
      await Promise.all([promise1, promise2, promise3]);
      io.to(player2SocketId).emit("levelInfo", { level: p2Level, exp: p2Exp });
    }
  } catch (error) {
    console.log(error);
    throw new Error("Fail to update exp.");
  }
}
