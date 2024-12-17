const socketIO = require("socket.io");

let io: any = null;

// Function to initialize the Socket.IO server
export const initializeSocketServer = (server: any) => {
  const io = socketIO(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST", "PATCH", "DELETE"],
    },
  });
  io.on("connection", (socket: any) => {
    console.log(`User connected: ${socket.id} 🔥`);

    // Send a message to the client
    socket.emit("msg", "Socket.IO connection established!");

    // Handle client events
    socket.on("clientEvent", (data: any) => {
      console.log("Data received from client:", data);
    });

    socket.on("disconnect", (reason: any) => {
      console.log(`User disconnected: ${socket.id}, Reason: ${reason}`);
    });
  });
};
// Function to emit events from anywhere in the app
export const getIO = () => {
  if (!io) {
    throw new Error("Socket.IO server not initialized");
  }
  return io;
};
