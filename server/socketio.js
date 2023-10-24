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
    socket.on("placement", async (ships) => {
      try {
        // get gameid
        const gameId = await redisClient.hGet(`socketId:${socket.id}`, "game");
        const isPlayer1 = await redisClient.hGet(`game:${gameId}`, "player1SocketId") === socket.id;

        // make board
        const board = []; // or columns
        for (let x = 0; x < 8; x++) {
          let column = [];
          for (let y = 0; y < 8; y++) {
            column.push("B");
          }
          board.push(column);
        }

        // processing: take ship pos and place into board
        for (const ship of ships) {
          if (ship.rotated) { // vertical
            for (let i = 0; i < 4; i++) { // 4 square long ships
              board[ship.x][ship.y + i] = "S";
            }
          } else { // horizontal
            for (let i = 0; i < 4; i++) { // 4 square long ships
              board[ship.x + i][ship.y] = "S";
            }
          }
        }

        // store string of the board
        const boardStr = board.map((column) => column.reduce((x, y) => x + y, "")).reduce((x, y) => x + y, ""); // concatenation
        if (isPlayer1) {
          await redisClient.hSet(`game:${gameId}`, "player1Board", boardStr);
        } else {
          await redisClient.hSet(`game:${gameId}`, "player2Board", boardStr);
        }

        // check if last, else wait for next
        if ((await redisClient.hExists(`game:${gameId}`, "player1Board")) && (await redisClient.hExists(`game:${gameId}`, "player2Board"))) {
          // prep to send start signal
          const player1SocketId = await redisClient.hGet(`game:${gameId}`, "player1SocketId");
          const player1Score = await redisClient.hGet(`game:${gameId}`, "player1Score");
          const player2SocketId = await redisClient.hGet(`game:${gameId}`, "player2SocketId");
          const player2Score = await redisClient.hGet(`game:${gameId}`, "player2Score");

          // message to send each player
          let message = {
            turn: null,
            scoreboard: [{
              socketId: player1SocketId,
              score: player1Score
            }, {
              socketId: player2SocketId,
              score: player2Score
            }
            ]
          }

          // choosing of whose turn
          let turn = null;

          if (Math.random() < 0.5) {
            turn = player1SocketId;
          } else {
            turn = player2SocketId;
          }

          // updating whose turn in redis game entry
          await redisClient.hSet(`game:${gameId}`, "turn", turn);

          message.turn = turn;
          io.to(player1SocketId).to(player2SocketId).emit("startSignal", message);
        }

      } catch (error) {
        console.log(error);
      }
    })
    socket.on("fire", async (position) => {
      // get gameid
      const gameId = await redisClient.hGet(`socketId:${socket.id}`, "game");
      const isPlayer1 = await redisClient.hGet(`game:${gameId}`, "player1SocketId") === socket.id;

      // get opponent board
      let boardStr;
      if (isPlayer1) {
        boardStr = await redisClient.hGet(`game:${gameId}`, "player2Board");
      } else {
        boardStr = await redisClient.hGet(`game:${gameId}`, "player1Board");
      }

      // convert board string to 2d array
      let board = [];
      let start = 0;
      let end = 8;
      for (let i = 0; i < 8; i++) {
        board.push(boardStr.slice(start, end));
        start += 8;
        end += 8;
      }
      board = board.map(columnStr => columnStr.split(""));

      // check if ship
      let isHit = false;

      if (Object.keys(position).length() !== 0) { // check if empty object
        if (board[position.x][position.y] === "S") {
          // hit
          board[position.x][position.y] = "H";
          isHit = true;

        } else if (board[position.x][position.y] === "B") {
          // miss
          board[position.x][position.y] = "M";
        }
        // for rest board remain unchanged
      }

      // update redis
      const player1SocketId = await redisClient.hGet(`game:${gameId}`, "player1SocketId");
      const player1Score = await redisClient.hGet(`game:${gameId}`, "player1Score");
      const player2SocketId = await redisClient.hGet(`game:${gameId}`, "player2SocketId");
      const player2Score = await redisClient.hGet(`game:${gameId}`, "player2Score");

      // update board
      // store string of the board
      boardStr = board.map((column) => column.reduce((x, y) => x + y, "")).reduce((x, y) => x + y, ""); // concatenation
      if (isPlayer1) {
        await redisClient.hSet(`game:${gameId}`, "player2Board", boardStr);
      } else {
        await redisClient.hSet(`game:${gameId}`, "player1Board", boardStr);
      }

      // craft message
      let message = {
        x: position.x,
        y: position.y,
        hit: isHit,
        winner: null
      }

      // check if won
      let numOfHits = 0;

      for (let i = 0; i < boardStr.length; i++) {
        if (boardStr[i] === "H") {
          numOfHits++;
        }
      }
      if (numOfHits >= 16) {
        // handle win
        message.winner = socket.id;

        if (isPlayer1) {
          await redisClient.hSet(`game:${gameId}`, "player1Score", player1Score + 1);
        } else {
          await redisClient.hSet(`game:${gameId}`, "player2Score", player2Score + 1);
        }
      }

      io.to(player1SocketId).to(player2SocketId).emit("fireResult", message);

    })
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
