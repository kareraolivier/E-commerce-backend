const socketIO = require("socket.io");
import http from "http";

let io: any = null;

// Function to initialize the Socket.IO server

export const initializeSocketServer = (server: any) => {
  // io = new Server(server, {
  //   cors: {
  //     origin: "*",
  //     methods: ["GET", "POST", "PATCH", "DELETE"],
  //   },
  //   transports: ["websocket"],
  // });

  io = socketIO(server);

  io.on("connection", () => {
    console.log("User connected:");
    io.emit("msg", "hello it is done");
    // socket.on("disconnect", () => {
    //   console.log("User disconnected:", socket.id);
    // });
  });

  console.log("Socket.IO server initialized");
};
// Function to emit events from anywhere in the app
export const getIO = () => {
  if (!io) {
    throw new Error("Socket.IO server not initialized");
  }
  return io;
};
