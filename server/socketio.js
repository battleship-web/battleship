import { findUserByUsername } from "./dao/userDao.js";
import bcrypt from "bcrypt";
import redisClient from "./config/redisClient.js";
import { nanoid } from "nanoid";

export default function (io) {
  redisClient.connect().catch(console.error);
  io.on("connection", (socket) => {
    console.log(`Socket connected: ${socket.id}`);
    socket.on("login", async (auth) => {
      const { username, password } = auth;
      try {
        if (username === "guest") {
          const guestUsername = `g:${nanoid(11)}`;
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
        const redisSearchPromise = connectedSockets.map((socketId) => {
          return redisClient.hGetAll(`socketId:${socketId}`);
        });
        const result = await Promise.all(redisSearchPromise);
        const filteredResult = result.filter((client) => {
          return client.role !== "admin";
        });
        const clientList = filteredResult.map((client) => {
          return {
            nickname: client.nickname,
            username: client.username,
            socketId: socket.id,
          };
        });

        socket.emit("clientList", clientList);
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
    socket.on("acceptInvite", (inviterSocketId) => {
      socket.to(inviterSocketId).emit("inviteAccepted", socket.id);
    });
    socket.on("refuseInvite", (inviterSocketId) => {
      socket.to(inviterSocketId).emit("inviteRefused", socket.id);
    });
  });
}
