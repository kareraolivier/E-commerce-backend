import { Server } from "socket.io";
import http from "http";

let io: Server | null = null;

// Function to initialize the Socket.IO server
export const initializeSocketServer = (server: http.Server) => {
  console.log("server,,,,,,,,,,,,,,,,,,,", server);
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  console.log("Socket.IO server initialized");
};

// Function to emit events from anywhere in the app
export const getIO = (): Server => {
  if (!io) {
    throw new Error("Socket.IO server not initialized");
  }
  return io;
};
