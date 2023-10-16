import express from "express";
import path from "path";
import { createServer } from "http";
import { Server } from "socket.io";
import connectDB from "./config/dbConn.js";
import allowedOrigins from "./config/allowedOrigins.js";
import mongoose from "mongoose";
import socketio from "./socketio.js";

async function run() {
  const port = process.env.PORT;

  const app = express();
  const httpServer = createServer(app);
  const __dirname = path.resolve();

  app.use(express.static(path.join(__dirname, "client", "dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
  });

  const socketIoOptions =
    process.env.APP_ENV === "production"
      ? {}
      : { cors: { origin: allowedOrigins } };

  const io = new Server(httpServer, socketIoOptions);
  await socketio(io);

  connectDB();
  mongoose.connection.once("open", () => {
    httpServer.listen(port, () => {
      console.log("🔗 Successfully Connected to MongoDB");
      console.log(`✅ Application running on port: ${port}`);
    });
  });
  mongoose.connection.on("error", (err) => {
    console.log(err);
  });
}

run();
