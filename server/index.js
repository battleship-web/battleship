import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL,
  },
});

let connectedClients = [];

io.on("connection", (socket) => {
  const clientId = `Guest#${connectedClients.length}`;
  connectedClients.push({
    socketId: socket.id,
    clientId: clientId,
    nickname: "Unknown",
  });
  socket.emit("clientId", clientId);
  socket.on("setNickname", (nickname) => {
    connectedClients = connectedClients.map((client) => {
      if (client.socketId != socket.id) {
        return client;
      } else {
        return { ...client, nickname: nickname };
      }
    });
  });
});

httpServer.listen(process.env.PORT, () => {
  if (process.env.APP_ENV === "development") {
    console.log(`Started listening on port ${process.env.PORT}...`);
  }
});
