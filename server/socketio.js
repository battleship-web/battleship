import { findUserByUsername } from "./dao/userDao.js";
import bcrypt from "bcrypt";
import redisClient from "./config/redisClient.js";
import { nanoid } from "nanoid";

export default function (io) {
  io.on("connection", (socket) => {
    console.log(`Socket connected: ${socket.id}`);
    socket.on("login", async (auth) => {
      const { username, password } = auth;
      try {
        if (username === "guest") {
          const guestUsername = `guest:${nanoid(12)}`;
          const promise1 = redisClient.hSet(
            `socketId:${socket.id}`,
            "username",
            guestUsername
          );
          const promise2 = redisClient.hSet(
            `socketId:${socket.id}`,
            "role",
            "guest"
          );
          await Promise.all([promise1, promise2]);
          socket.emit("loginResponse", {
            success: true,
            message: {
              username: guestUsername,
              role: "guest",
            },
          });
          return;
        }
        const user = await findUserByUsername(username);
        if (!user) {
          socket.emit("loginResponse", {
            success: false,
            message: "User not found.",
          });
          return;
        }
        const match = await bcrypt.compare(password, user.passwordHash);
        if (match) {
          const promise1 = redisClient.hSet(
            `socketId:${socket.id}`,
            "username",
            user.username
          );
          const promise2 = redisClient.hSet(
            `socketId:${socket.id}`,
            "role",
            user.role
          );
          const promise3 = redisClient.hSet(
            `socketId:${socket.id}`,
            "nickname",
            user.nickname
          );
          await Promise.all([promise1, promise2, promise3]);
          socket.emit("loginResponse", {
            success: true,
            message: {
              username: user.username,
              role: user.role,
              nickname: user.nickname,
            },
          });
          return;
        } else {
          socket.emit("loginResponse", {
            success: false,
            message: "Wrong password.",
          });
          return;
        }
      } catch (error) {
        console.log(error);
        socket.emit("loginResponse", {
          success: false,
          message: "Internal server error.",
        });
        return;
      }
    });
    socket.on("disconnect", async () => {
      try {
        const gameId = await redisClient.hGet(`socketId:${socket.id}`, "game");
        if (gameId) {
          const gameInfo = await redisClient.hGetAll(`game:${gameId}`);
          const otherPlayerSocketId =
            gameInfo.player1SocketId === socket.id
              ? gameInfo.player2SocketId
              : gameInfo.player1SocketId;

          socket.to(otherPlayerSocketId).emit("opponentQuit");

          const promise1 = redisClient.del(`game:${gameId}`);
          const promise2 = redisClient.sRem("gameList", gameId);
          const promise3 = redisClient.hDel(
            `socketId:${otherPlayerSocketId}`,
            "game"
          );
          await Promise.all([promise1, promise2, promise3]);
        }

        await redisClient.del(`socketId:${socket.id}`);
        console.log(`Socket disconnected: ${socket.id}`);
      } catch (err) {
        console.log(err);
      }
    });
    socket.on("setNickname", async (nickname) => {
      try {
        await redisClient.hSet(`socketId:${socket.id}`, "nickname", nickname);
      } catch (error) {
        console.log(error);
      }
    });
    socket.on("clientListRequest", async () => {
      try {
        const connectedSockets = Array.from(io.sockets.sockets.keys());
        const redisSearchPromises = connectedSockets.map((socketId) => {
          return redisClient.hGetAll(`socketId:${socketId}`);
        });
        const redisSearchResults = await Promise.all(redisSearchPromises);
        const resultsWithSocketId = connectedSockets.map((socketId, index) => {
          return {
            socketId: socketId,
            data: redisSearchResults[index],
          };
        });
        const filteredResult = resultsWithSocketId.filter((client) => {
          return (
            client.data.role !== "admin" &&
            typeof client.data.game === "undefined" &&
            typeof client.data.nickname !== "undefined"
          );
        });
        const clientList = filteredResult.map((client) => {
          return {
            nickname: client.data.nickname,
            username: client.data.username,
            socketId: client.socketId,
          };
        });

        socket.emit("clientList", clientList);
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("allClientListRequest", async () => {
      try {
        const connectedSockets = Array.from(io.sockets.sockets.keys());
        const redisSearchPromises = connectedSockets.map((socketId) => {
          return redisClient.hGetAll(`socketId:${socketId}`);
        });
        const redisSearchResults = await Promise.all(redisSearchPromises);
        const resultsWithSocketId = connectedSockets.map((socketId, index) => {
          return {
            socketId: socketId,
            data: redisSearchResults[index],
          };
        });
        const filteredResult = resultsWithSocketId.filter((client) => {
          return client.data.role !== "admin";
        });
        const clientList = filteredResult.map((client) => {
          return {
            nickname: client.data.nickname,
            username: client.data.username,
            socketId: client.socketId,
            gameId: client.data.game,
          };
        });

        socket.emit("allClientList", clientList);
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("invite", async (inviteeSocketId) => {
      if (!io.sockets.sockets.has(inviteeSocketId)) {
        socket.emit("inviteeLeft", inviteeSocketId);
        return;
      }
      socket.to(inviteeSocketId).emit("incomingInvite", socket.id);
    });
    socket.on("acceptInvite", async (inviterSocketId) => {
      try {
        const gameId = nanoid(12);
        const promise1 = redisClient.sAdd("gameList", gameId);
        const promise2 = redisClient.hSet(
          `game:${gameId}`,
          "player1SocketId",
          inviterSocketId
        );
        const promise3 = redisClient.hSet(
          `game:${gameId}`,
          "player2SocketId",
          socket.id
        );
        const promise4 = redisClient.hSet(`game:${gameId}`, "player1Score", 0);
        const promise5 = redisClient.hSet(`game:${gameId}`, "player2Score", 0);
        const promise6 = redisClient.hSet(
          `socketId:${inviterSocketId}`,
          "game",
          gameId
        );
        const promise7 = redisClient.hSet(
          `socketId:${socket.id}`,
          "game",
          gameId
        );

        await Promise.all([
          promise1,
          promise2,
          promise3,
          promise4,
          promise5,
          promise6,
          promise7,
        ]);
        socket.to(inviterSocketId).emit("inviteAccepted", socket.id);
      } catch (error) {
        console.log(error);
      }
    });
    socket.on("refuseInvite", (inviterSocketId) => {
      socket.to(inviterSocketId).emit("inviteRefused", socket.id);
    });
    socket.on("gameListRequest", async () => {
      try {
        const redisSearchPromise = redisClient.sMembers("gameList");
        const gameIdList = await redisSearchPromise;
        const gameListPromises = gameIdList.map((gameId) => {
          return redisClient.hGetAll(`game:${gameId}`);
        });
        const gameList = await Promise.all(gameListPromises);

        const player1InfoPromises = gameList.map((game) => {
          return redisClient.hGetAll(`socketId:${game.player1SocketId}`);
        });
        const player1Info = await Promise.all(player1InfoPromises);

        const player2InfoPromises = gameList.map((game) => {
          return redisClient.hGetAll(`socketId:${game.player2SocketId}`);
        });
        const player2Info = await Promise.all(player2InfoPromises);

        const formattedGameList = gameList.map((game, index) => {
          return {
            gameId: gameIdList[index],
            player1: {
              username: player1Info[index].username,
              nickname: player1Info[index].nickname,
              score: game.player1Score,
            },
            player2: {
              username: player2Info[index].username,
              nickname: player2Info[index].nickname,
              score: game.player2Score,
            },
          };
        });
        socket.emit("gameList", formattedGameList);
      } catch (error) {
        console.log(error);
      }
    });
  });
}
