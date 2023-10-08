import express from "express";
import path from "path";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "client", "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

const option =
  process.env.APP_ENV === "production"
    ? {}
    : { cors: { origin: "http://localhost:5173" } };

const io = new Server(httpServer, option);

let connectedClients = [];

io.on("connection", (socket) => {
  const clientId = `Guest#${connectedClients.length}`;
  connectedClients.push({
    socketId: socket.id,
    clientId: clientId,
    nickname: "Unknown",
  });
  console.log(`${clientId} connected.`);
  socket.emit("clientId", clientId);
  socket.on("setNickname", (nickname) => {
    connectedClients = connectedClients.map((client) => {
      if (client.socketId != socket.id) {
        return client;
      } else {
        console.log(`${client.clientId} is ${nickname}.`);
        return { ...client, nickname: nickname };
      }
    });
  });
});

httpServer.listen(process.env.PORT, () => {
  console.log(`Started listening on port ${process.env.PORT}...`);
});
