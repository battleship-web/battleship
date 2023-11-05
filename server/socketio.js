import {
  findUserByUsername,
  createUser,
  setUserProfilePicture,
} from "./dao/userDao.js";
import bcrypt from "bcrypt";
import redisClient from "./config/redisClient.js";
import { nanoid } from "nanoid";
import { convertBoardStrTo2DArray } from "./utils/board.js";
import { updateExp } from "./utils/exp.js";

export default function (io) {
  io.on("connection", (socket) => {
    console.log(`Socket connected: ${socket.id}`);
    socket.on("register", async (info) => {
      try {
        const { username, password, nickname, profilePicture } = info;
        if (await findUserByUsername(username)) {
          socket.emit("registerResponse", {
            success: false,
            message: "Username already exists.",
          });
          return;
        }
        await createUser(username, password, nickname, profilePicture);
        socket.emit("registerResponse", {
          success: true,
        });
      } catch (error) {
        console.log(error);
        socket.emit("registerResponse", {
          success: false,
          message: "Internal Server Error",
        });
      }
    });
    socket.on("login", async (auth) => {
      try {
        const { username, password } = auth;
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
          if (user.role === "admin") {
            await redisClient.hSet(
              `socketId:${socket.id}`,
              "username",
              user.username
            );
            await redisClient.hSet(`socketId:${socket.id}`, "role", user.role);
            socket.emit("loginResponse", {
              success: true,
              message: {
                username: user.username,
                role: user.role,
              },
            });
            return;
          }
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
          const promise4 = redisClient.hSet(
            `socketId:${socket.id}`,
            "level",
            user.level
          );
          const promise5 = redisClient.hSet(
            `socketId:${socket.id}`,
            "exp",
            user.exp
          );
          const promise6 = redisClient.hSet(
            `socketId:${socket.id}`,
            "profilePicture",
            user.profilePicture
          );
          await Promise.all([
            promise1,
            promise2,
            promise3,
            promise4,
            promise5,
            promise6,
          ]);

          socket.emit("loginResponse", {
            success: true,
            message: {
              username: user.username,
              role: user.role,
              nickname: user.nickname,
              level: user.level,
              exp: user.exp,
              profilePicture: user.profilePicture,
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
          const isPlayer1 = socket.id === gameInfo.player1SocketId;
          const otherPlayerSocketId = isPlayer1
            ? gameInfo.player2SocketId
            : gameInfo.player1SocketId;

          await updateExp(
            io,
            gameId,
            gameInfo.player1SocketId,
            gameInfo.player2SocketId,
            gameInfo.player1Score,
            gameInfo.player2Score
          );

          socket.to(otherPlayerSocketId).emit("opponentQuit");
          if (io.sockets.adapter.rooms.get(`watch:${gameId}`)) {
            io.to(`watch:${gameId}`).emit("sptGameEnd");
            io.socketsLeave(`watch:${gameId}`);
          }
          const fieldForPlayer = isPlayer1
            ? "player1NumberOfShips"
            : "player2NumberOfShips";
          const fieldForOther = isPlayer1
            ? "player2NumberOfShips"
            : "player1NumberOfShips";

          // delete old ship placement info
          const playerNumberOfShips = parseInt(
            await redisClient.hGet(`game:${gameId}`, fieldForPlayer)
          );

          for (let i = 0; i < playerNumberOfShips; i++) {
            await redisClient.del(`ship${i}:${socket.id}`);
          }

          const OtherNumberOfShips = parseInt(
            await redisClient.hGet(`game:${gameId}`, fieldForOther)
          );

          for (let i = 0; i < OtherNumberOfShips; i++) {
            await redisClient.del(`ship${i}:${otherPlayerSocketId}`);
          }

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
            level: client.data.level,
            profilePicture: client.data.profilePicture,
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
            level: client.data.level,
            profilePicture: client.data.profilePicture,
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
      const inviterNickname = await redisClient.hGet(
        `socketId:${socket.id}`,
        "nickname"
      );
      const inviterUsername = await redisClient.hGet(
        `socketId:${socket.id}`,
        "username"
      );
      const inviterLevel = await redisClient.hGet(
        `socketId:${socket.id}`,
        "level"
      );
      const inviterProfilePicture = await redisClient.hGet(
        `socketId:${socket.id}`,
        "profilePicture"
      );
      socket.to(inviteeSocketId).emit("incomingInvite", {
        socketId: socket.id,
        nickname: inviterNickname,
        username: inviterUsername,
        level: inviterLevel,
        profilePicture: inviterProfilePicture,
      });
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
        const boardWidth = 8;

        // get gameid
        const gameId = await redisClient.hGet(`socketId:${socket.id}`, "game");
        const isPlayer1 =
          (await redisClient.hGet(`game:${gameId}`, "player1SocketId")) ===
          socket.id;

        // make board
        const board = []; // or columns
        for (let x = 0; x < boardWidth; x++) {
          let column = [];
          for (let y = 0; y < boardWidth; y++) {
            column.push("B");
          }
          board.push(column);
        }

        if (isPlayer1) {
          await redisClient.hSet(
            `game:${gameId}`,
            "player1NumberOfShips",
            ships.length
          );
        } else {
          await redisClient.hSet(
            `game:${gameId}`,
            "player2NumberOfShips",
            ships.length
          );
        }

        // processing: take ship pos and place into board
        for (const [index, ship] of ships.entries()) {
          // storing original ship position
          const storePromise1 = redisClient.hSet(
            `ship${index}:${socket.id}`,
            "x",
            ship.x
          );
          const storePromise2 = redisClient.hSet(
            `ship${index}:${socket.id}`,
            "y",
            ship.y
          );
          const storePromise3 = redisClient.hSet(
            `ship${index}:${socket.id}`,
            "size",
            ship.size
          );
          const storePromise4 = redisClient.hSet(
            `ship${index}:${socket.id}`,
            "rotated",
            ship.rotated ? "true" : "false"
          );

          await Promise.all([
            storePromise1,
            storePromise2,
            storePromise3,
            storePromise4,
          ]);

          if (ship.rotated) {
            // vertical
            for (let i = 0; i < ship.size; i++) {
              board[ship.x][ship.y + i] = "S";
            }
          } else {
            // horizontal
            for (let i = 0; i < ship.size; i++) {
              board[ship.x + i][ship.y] = "S";
            }
          }
        }

        // store string of the board
        const boardStr = board
          .map((column) => column.reduce((x, y) => x + y, ""))
          .reduce((x, y) => x + y, ""); // concatenation
        if (isPlayer1) {
          await redisClient.hSet(`game:${gameId}`, "player1Board", boardStr);
        } else {
          await redisClient.hSet(`game:${gameId}`, "player2Board", boardStr);
        }

        // check if last, else wait for next
        if (
          (await redisClient.hExists(`game:${gameId}`, "player1Board")) &&
          (await redisClient.hExists(`game:${gameId}`, "player2Board"))
        ) {
          // prep to send start signal
          const player1SocketId = await redisClient.hGet(
            `game:${gameId}`,
            "player1SocketId"
          );
          const player1Score = parseInt(
            await redisClient.hGet(`game:${gameId}`, "player1Score")
          );
          const player2SocketId = await redisClient.hGet(
            `game:${gameId}`,
            "player2SocketId"
          );
          const player2Score = parseInt(
            await redisClient.hGet(`game:${gameId}`, "player2Score")
          );

          // message to send each player
          let message = {
            turn: null,
            scoreboard: [
              {
                socketId: player1SocketId,
                score: player1Score,
              },
              {
                socketId: player2SocketId,
                score: player2Score,
              },
            ],
          };

          // choosing of whose turn
          let turn = null;

          if (await redisClient.hExists(`game:${gameId}`, "lastWinner")) {
            turn = await redisClient.hGet(`game:${gameId}`, "lastWinner");
          } else {
            if (Math.random() < 0.5) {
              turn = player1SocketId;
            } else {
              turn = player2SocketId;
            }
          }

          // updating whose turn in redis game entry
          await redisClient.hSet(`game:${gameId}`, "turn", turn);
          message.turn = turn;

          // send info to spectators
          if (io.sockets.adapter.rooms.get(`watch:${gameId}`)) {
            const otherPlayerSocketId = isPlayer1
              ? player2SocketId
              : player1SocketId;

            const fieldForShipNumber = isPlayer1
              ? "player2NumberOfShips"
              : "player1NumberOfShips";

            const otherPlayerNumberOfShips = parseInt(
              await redisClient.hGet(`game:${gameId}`, fieldForShipNumber)
            );

            const getPromises = Array(otherPlayerNumberOfShips)
              .fill()
              .map((_, index) => {
                return redisClient.hGetAll(
                  `ship${index}:${otherPlayerSocketId}`
                );
              });

            const otherPlayerOriginalBoard = await Promise.all(getPromises);

            // parse string into appropriate types
            otherPlayerOriginalBoard.forEach((ship, index) => {
              otherPlayerOriginalBoard[index].x = parseInt(ship.x);
              otherPlayerOriginalBoard[index].y = parseInt(ship.y);
              otherPlayerOriginalBoard[index].size = parseInt(ship.size);
              otherPlayerOriginalBoard[index].rotated = ship.rotated === "true";
            });

            const sptMessage = {
              p1OriginalBoard: isPlayer1 ? ships : otherPlayerOriginalBoard,
              p2OriginalBoard: isPlayer1 ? otherPlayerOriginalBoard : ships,
              p1BoardFireResults: null,
              p2BoardFireResults: null,
              turn: turn,
              p1Score: player1Score,
              p2Score: player2Score,
            };

            io.to(`watch:${gameId}`).emit("sptGameInfo", sptMessage);
          }

          io.to(player1SocketId)
            .to(player2SocketId)
            .emit("startSignal", message);
        }
      } catch (error) {
        console.log(error);
      }
    });
    socket.on("fire", async (position) => {
      try {
        // get gameid
        const gameId = await redisClient.hGet(`socketId:${socket.id}`, "game");
        const isPlayer1 =
          (await redisClient.hGet(`game:${gameId}`, "player1SocketId")) ===
          socket.id;

        // get opponent board
        let boardStr;
        if (isPlayer1) {
          boardStr = await redisClient.hGet(`game:${gameId}`, "player2Board");
        } else {
          boardStr = await redisClient.hGet(`game:${gameId}`, "player1Board");
        }

        // convert board string to 2d array
        const boardWidth = 8;
        let board = [];
        let start = 0;
        let end = boardWidth;
        for (let i = 0; i < boardWidth; i++) {
          board.push(boardStr.slice(start, end));
          start += boardWidth;
          end += boardWidth;
        }
        board = board.map((columnStr) => columnStr.split(""));

        // check if ship
        let isHitArr = [false, false, false, false];
        let isHitArrIndex = 0;
        let bombWidth = 1;

        if (position.bomb) {
          bombWidth = 2;
        }

        for (let i = 0; i < bombWidth; i++) {
          for (let j = 0; j < bombWidth; j++) {
            const xPos = position.x + j;
            const yPos = position.y + i;

            if (xPos < boardWidth && yPos < boardWidth) {
              // check if in board
              if (board[xPos][yPos] === "S") {
                // hit
                board[xPos][yPos] = "H";
                isHitArr[isHitArrIndex] = true;
              } else if (board[xPos][yPos] === "B") {
                // miss
                board[xPos][yPos] = "M";
              }
              // for rest board remain unchanged
            }
            isHitArrIndex++;
          }
        }

        // lightning event
        let lightning = false;
        let lightningX = -1;
        let lightningY = -1;
        let lightningHit = false;
        if (Math.random() < 0.2) {
          // 20% chance
          lightning = true;

          // count how many available squares
          let posOfSquaresNotHitArr = [];
          for (let i = 0; i < boardWidth; i++) {
            for (let j = 0; j < boardWidth; j++) {
              if (board[i][j] === "S" || board[i][j] === "B") {
                posOfSquaresNotHitArr.push({
                  x: i,
                  y: j,
                });
              }
            }
          }

          // random choose
          if (posOfSquaresNotHitArr.length > 0) {
            let chosenPos = Math.floor(
              Math.random() * posOfSquaresNotHitArr.length
            ); // zero-index
            lightningX = posOfSquaresNotHitArr[chosenPos].x;
            lightningY = posOfSquaresNotHitArr[chosenPos].y;

            // update board
            if (
              board[posOfSquaresNotHitArr[chosenPos].x][
                posOfSquaresNotHitArr[chosenPos].y
              ] === "S"
            ) {
              // hit
              board[posOfSquaresNotHitArr[chosenPos].x][
                posOfSquaresNotHitArr[chosenPos].y
              ] = "L";
              lightningHit = true;
            } else if (
              board[posOfSquaresNotHitArr[chosenPos].x][
                posOfSquaresNotHitArr[chosenPos].y
              ] === "B"
            ) {
              // miss
              board[posOfSquaresNotHitArr[chosenPos].x][
                posOfSquaresNotHitArr[chosenPos].y
              ] = "V";
            }
          }
        }

        // update redis
        const player1SocketId = await redisClient.hGet(
          `game:${gameId}`,
          "player1SocketId"
        );
        const player1Score = parseInt(
          await redisClient.hGet(`game:${gameId}`, "player1Score")
        );
        const player2SocketId = await redisClient.hGet(
          `game:${gameId}`,
          "player2SocketId"
        );
        const player2Score = parseInt(
          await redisClient.hGet(`game:${gameId}`, "player2Score")
        );

        // update board
        // store string of the board
        boardStr = board
          .map((column) => column.reduce((x, y) => x + y, ""))
          .reduce((x, y) => x + y, ""); // concatenation
        if (isPlayer1) {
          await redisClient.hSet(`game:${gameId}`, "player2Board", boardStr);
        } else {
          await redisClient.hSet(`game:${gameId}`, "player1Board", boardStr);
        }

        // craft message
        let message = {
          x: position.x,
          y: position.y,
          hit: isHitArr[0],
          bomb: position.bomb,
          lightning: lightning,
          lightningX: lightningX,
          lightningY: lightningY,
          lightningHit: lightningHit,
          winner: null,
        };

        // for bomb case
        if (position.bomb) {
          message.hit = isHitArr;
        }

        // check if won
        let numOfHits = 0;

        for (let i = 0; i < boardStr.length; i++) {
          if (boardStr[i] === "H" || boardStr[i] === "L") {
            numOfHits++;
          }
        }
        if (numOfHits >= 16) {
          // handle win
          message.winner = socket.id;

          if (isPlayer1) {
            await redisClient.hSet(
              `game:${gameId}`,
              "player1Score",
              player1Score + 1
            );
          } else {
            await redisClient.hSet(
              `game:${gameId}`,
              "player2Score",
              player2Score + 1
            );
          }

          await redisClient.hSet(`game:${gameId}`, "lastWinner", socket.id);
        }

        if (isPlayer1) {
          await redisClient.hSet(`game:${gameId}`, "turn", player2SocketId);
        } else {
          await redisClient.hSet(`game:${gameId}`, "turn", player1SocketId);
        }

        io.to(player1SocketId).to(player2SocketId).emit("fireResult", message);
        io.to(`watch:${gameId}`).emit("sptFireResult", message);
      } catch (error) {
        console.log(error);
      }
    });
    socket.on("replay", async (wantsReplay) => {
      try {
        const gameId = await redisClient.hGet(`socketId:${socket.id}`, "game");
        const isPlayer1 =
          (await redisClient.hGet(`game:${gameId}`, "player1SocketId")) ===
          socket.id;

        // delete ship placement info from redis
        let fieldForShipNumber = isPlayer1
          ? "player1NumberOfShips"
          : "player2NumberOfShips";

        const numberOfShips = parseInt(
          await redisClient.hGet(`game:${gameId}`, fieldForShipNumber)
        );

        for (let i = 0; i < numberOfShips; i++) {
          await redisClient.del(`ship${i}:${socket.id}`);
        }

        const wantsReplayInString = wantsReplay ? "true" : "false";
        // store player wants replay status in redis
        if (isPlayer1) {
          await redisClient.hSet(
            `game:${gameId}`,
            "player1WantsReplay",
            wantsReplayInString
          );
        } else {
          await redisClient.hSet(
            `game:${gameId}`,
            "player2WantsReplay",
            wantsReplayInString
          );
        }

        // check if replay statuses in
        if (
          (await redisClient.hExists(`game:${gameId}`, "player1WantsReplay")) &&
          (await redisClient.hExists(`game:${gameId}`, "player2WantsReplay"))
        ) {
          // handle when both replay statuses in
          // get replay statuses converted to boolean
          const player1WantsReplay =
            (await redisClient.hGet(`game:${gameId}`, "player1WantsReplay")) ===
            "true";
          const player2WantsReplay =
            (await redisClient.hGet(`game:${gameId}`, "player2WantsReplay")) ===
            "true";

          // get replayConsensus
          const bothWantsReplay = player1WantsReplay && player2WantsReplay;

          // get id for sending message
          const player1SocketId = await redisClient.hGet(
            `game:${gameId}`,
            "player1SocketId"
          );
          const player2SocketId = await redisClient.hGet(
            `game:${gameId}`,
            "player2SocketId"
          );

          // delete players wants replay off redis
          await redisClient.hDel(`game:${gameId}`, "player1WantsReplay");
          await redisClient.hDel(`game:${gameId}`, "player2WantsReplay");

          // end game
          if (!bothWantsReplay) {
            await updateExp(io, gameId, player1SocketId, player2SocketId);
            // handle when both dont want replay
            // remove game info entry
            const deleteGamePromise = redisClient.del(`game:${gameId}`);

            // remove gameId from game list
            const deleteGameEntryPromise = redisClient.sRem("gameList", gameId);

            const delGamePlayer1Promise = redisClient.hDel(
              `socketId:${player1SocketId}`,
              "game"
            );

            const delGamePlayer2Promise = redisClient.hDel(
              `socketId:${player2SocketId}`,
              "game"
            );

            await Promise.all([
              deleteGamePromise,
              deleteGameEntryPromise,
              delGamePlayer1Promise,
              delGamePlayer2Promise,
            ]);
            if (io.sockets.adapter.rooms.get(`watch:${gameId}`)) {
              io.to(`watch:${gameId}`).emit("sptGameEnd");
              io.socketsLeave(`watch:${gameId}`);
            }
          } else {
            // delete old board data from redis
            await redisClient.hDel(`game:${gameId}`, "player1Board");
            await redisClient.hDel(`game:${gameId}`, "player2Board");
          }

          if (player1WantsReplay) {
            io.to(player1SocketId).emit("replayConsensus", bothWantsReplay);
          }
          if (player2WantsReplay) {
            io.to(player2SocketId).emit("replayConsensus", bothWantsReplay);
          }
        }
      } catch (error) {
        console.log(error);
      }
    });
    socket.on("initiateReset", async (resetRequest) => {
      try {
        if (
          (await redisClient.hGet(`socketId:${socket.id}`, "role")) === "admin"
        ) {
          // check if game exists
          if (await redisClient.sIsMember("gameList", resetRequest.gameId)) {
            // craft message
            const player1SocketId = await redisClient.hGet(
              `game:${resetRequest.gameId}`,
              "player1SocketId"
            );
            const player2SocketId = await redisClient.hGet(
              `game:${resetRequest.gameId}`,
              "player2SocketId"
            );

            const message = {
              toReset: resetRequest.toReset,
            };

            // update in redis
            if (resetRequest.toReset === "score") {
              await redisClient.hSet(
                `game:${resetRequest.gameId}`,
                "player1Score",
                0
              );
              await redisClient.hSet(
                `game:${resetRequest.gameId}`,
                "player2Score",
                0
              );
            } else if (resetRequest.toReset === "game") {
              // old board must be deleted since the placement event listener checks for old board to send startSignal
              await redisClient.hDel(
                `game:${resetRequest.gameId}`,
                "player1Board"
              );
              await redisClient.hDel(
                `game:${resetRequest.gameId}`,
                "player2Board"
              );

              // delete old ship placement info
              const player1NumberOfShips = parseInt(
                await redisClient.hGet(
                  `game:${resetRequest.gameId}`,
                  "player1NumberOfShips"
                )
              );

              for (let i = 0; i < player1NumberOfShips; i++) {
                await redisClient.del(`ship${i}:${player1SocketId}`);
              }

              const player2NumberOfShips = parseInt(
                await redisClient.hGet(
                  `game:${resetRequest.gameId}`,
                  "player2NumberOfShips"
                )
              );

              for (let i = 0; i < player2NumberOfShips; i++) {
                await redisClient.del(`ship${i}:${player2SocketId}`);
              }
            } else if (resetRequest.toReset === "cancel") {
              // handle when game end

              // delete old ship placement info
              const player1NumberOfShips = parseInt(
                await redisClient.hGet(
                  `game:${resetRequest.gameId}`,
                  "player1NumberOfShips"
                )
              );

              for (let i = 0; i < player1NumberOfShips; i++) {
                await redisClient.del(`ship${i}:${player1SocketId}`);
              }

              const player2NumberOfShips = parseInt(
                await redisClient.hGet(
                  `game:${resetRequest.gameId}`,
                  "player2NumberOfShips"
                )
              );

              for (let i = 0; i < player2NumberOfShips; i++) {
                await redisClient.del(`ship${i}:${player2SocketId}`);
              }
              // remove game info entry
              const deleteGamePromise = redisClient.del(
                `game:${resetRequest.gameId}`
              );

              // remove gameId from game list
              const deleteGameEntryPromise = redisClient.sRem(
                "gameList",
                resetRequest.gameId
              );

              const delGamePlayer1Promise = redisClient.hDel(
                `socketId:${player1SocketId}`,
                "game"
              );

              const delGamePlayer2Promise = redisClient.hDel(
                `socketId:${player2SocketId}`,
                "game"
              );

              await Promise.all([
                deleteGamePromise,
                deleteGameEntryPromise,
                delGamePlayer1Promise,
                delGamePlayer2Promise,
              ]);
            }

            io.to(player1SocketId).to(player2SocketId).emit("reset", message);
            io.to(`watch:${resetRequest.gameId}`).emit("sptReset", message);
          }
        }
      } catch (error) {
        console.log(error);
      }
    });
    socket.on("quit", async () => {
      try {
        const gameId = await redisClient.hGet(`socketId:${socket.id}`, "game");
        const isPlayer1 =
          (await redisClient.hGet(`game:${gameId}`, "player1SocketId")) ===
          socket.id;
        let otherPlayerSocketId;

        if (isPlayer1) {
          otherPlayerSocketId = await redisClient.hGet(
            `game:${gameId}`,
            "player2SocketId"
          );
        } else {
          otherPlayerSocketId = await redisClient.hGet(
            `game:${gameId}`,
            "player1SocketId"
          );
        }

        const fieldForPlayer = isPlayer1
          ? "player1NumberOfShips"
          : "player2NumberOfShips";
        const fieldForOther = isPlayer1
          ? "player2NumberOfShips"
          : "player1NumberOfShips";

        // delete old ship placement info
        const playerNumberOfShips = parseInt(
          await redisClient.hGet(`game:${gameId}`, fieldForPlayer)
        );

        for (let i = 0; i < playerNumberOfShips; i++) {
          await redisClient.del(`ship${i}:${socket.id}`);
        }

        const OtherNumberOfShips = parseInt(
          await redisClient.hGet(`game:${gameId}`, fieldForOther)
        );

        for (let i = 0; i < OtherNumberOfShips; i++) {
          await redisClient.del(`ship${i}:${otherPlayerSocketId}`);
        }
        const player1SocketId = isPlayer1 ? socket.id : otherPlayerSocketId;
        const player2SocketId = isPlayer1 ? otherPlayerSocketId : socket.id;
        await updateExp(io, gameId, player1SocketId, player2SocketId);
        // remove game info entry
        const deleteGamePromise = redisClient.del(`game:${gameId}`);

        // remove gameId from game list ---- some error here
        const deleteGameEntryPromise = redisClient.sRem("gameList", gameId);

        const delPlayerGamePromise = redisClient.hDel(
          `socketId:${socket.id}`,
          "game"
        );

        const delOtherPlayerGamePromise = redisClient.hDel(
          `socketId:${otherPlayerSocketId}`,
          "game"
        );

        await Promise.all([
          deleteGamePromise,
          deleteGameEntryPromise,
          delPlayerGamePromise,
          delOtherPlayerGamePromise,
        ]);

        io.to(otherPlayerSocketId).emit("opponentQuit");
        io.to(`watch:${gameId}`).emit("sptGameEnd");
        io.socketsLeave(`watch:${gameId}`);
      } catch (error) {
        console.log(error);
      }
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
              level: player1Info[index].level,
              profilePicture: player1Info[index].profilePicture,
              score: game.player1Score,
              socketId: game.player1SocketId,
            },
            player2: {
              username: player2Info[index].username,
              nickname: player2Info[index].nickname,
              level: player2Info[index].level,
              profilePicture: player2Info[index].profilePicture,
              score: game.player2Score,
              socketId: game.player2SocketId,
            },
          };
        });
        socket.emit("gameList", formattedGameList);
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("watch", async (gameId) => {
      try {
        if (!(await redisClient.exists(`game:${gameId}`))) {
          socket.emit("sptGameInfo", "The selected game is no longer active.");
          return;
        }
        const gameInfo = await redisClient.hGetAll(`game:${gameId}`);
        if (
          typeof gameInfo.player1Board === "undefined" ||
          typeof gameInfo.player2Board === "undefined"
        ) {
          socket.join(`watch:${gameId}`);
          return;
        }

        const p1ShipInfoPromises = Array(
          parseInt(gameInfo.player1NumberOfShips)
        )
          .fill()
          .map((_, index) => {
            return redisClient.hGetAll(
              `ship${index}:${gameInfo.player1SocketId}`
            );
          });
        const p1OriginalBoard = await Promise.all(p1ShipInfoPromises);

        // parse string into appropriate types
        p1OriginalBoard.forEach((ship, index) => {
          p1OriginalBoard[index].x = parseInt(ship.x);
          p1OriginalBoard[index].y = parseInt(ship.y);
          p1OriginalBoard[index].size = parseInt(ship.size);
          p1OriginalBoard[index].rotated = ship.rotated === "true";
        });

        const p2ShipInfoPromises = Array(
          parseInt(gameInfo.player2NumberOfShips)
        )
          .fill()
          .map((_, index) => {
            return redisClient.hGetAll(
              `ship${index}:${gameInfo.player2SocketId}`
            );
          });
        const p2OriginalBoard = await Promise.all(p2ShipInfoPromises);

        // parse string into appropriate types
        p2OriginalBoard.forEach((ship, index) => {
          p2OriginalBoard[index].x = parseInt(ship.x);
          p2OriginalBoard[index].y = parseInt(ship.y);
          p2OriginalBoard[index].size = parseInt(ship.size);
          p2OriginalBoard[index].rotated = ship.rotated === "true";
        });

        const p1BoardFireResults = convertBoardStrTo2DArray(
          await redisClient.hGet(`game:${gameId}`, "player1Board")
        );

        const p2BoardFireResults = convertBoardStrTo2DArray(
          await redisClient.hGet(`game:${gameId}`, "player2Board")
        );

        const message = {
          p1OriginalBoard: p1OriginalBoard,
          p2OriginalBoard: p2OriginalBoard,
          p1BoardFireResults: p1BoardFireResults,
          p2BoardFireResults: p2BoardFireResults,
          turn: gameInfo.turn,
          p1Score: gameInfo.player1Score,
          p2Score: gameInfo.player2Score,
        };

        socket.join(`watch:${gameId}`);
        socket.emit("sptGameInfo", message);
      } catch (error) {
        console.log(error);
        socket.emit("sptGameInfo", "Internal server error occurred.");
      }
    });

    socket.on("sptLeaveRoom", (gameId) => {
      try {
        socket.leave(`watch:${gameId}`);
      } catch (error) {
        console.log(error);
      }
    });
    socket.on("setProfilePicture", async (profilePicture) => {
      await redisClient.hSet(
        `socketId:${socket.id}`,
        "profilePicture",
        profilePicture
      );
      setUserProfilePicture(
        await redisClient.hGet(`socketId:${socket.id}`, "username"),
        profilePicture
      );
    });

    socket.on("requestLevelInfo", async () => {
      try {
        const username = await redisClient.hGet(
          `socketId:${socket.id}`,
          "username"
        );
        const user = await findUserByUsername(username);
        if (!user) {
          return;
        }
        await redisClient.hSet(`socketId:${socket.id}`, "level", user.level);
        await redisClient.hSet(`socketId:${socket.id}`, "exp", user.exp);
        socket.emit("levelInfo", { level: user.level, exp: user.exp });
      } catch (error) {
        console.log(error);
      }
    });
  });
}
