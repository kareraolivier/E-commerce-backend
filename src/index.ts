import express from "express";
import db from "../models";
import morgan from "morgan";
import Router from "./routes";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/errorHandler";
import path from "path";
import fs from "fs";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

const PORT = process.env.PORT || 8000;
dotenv.config();
const app = express();

// Socket.io
const server = http.createServer(app);
const io = new Server(server);
io.on("connection", (socket: any) => {
  console.log("User connected", socket.id);
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// sequelize connection
db.sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection established successfully.");
  })
  .catch((error: any) => {
    console.error("Unable to connect to the database:", error);
  });

db.sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Sequelize connected to the database");
  })
  .catch((error: any) => {
    console.error("Unable to connect to the database with Sequelize:", error);
  });

// Enable CORS
app.use(cors());

// Logging with morgan
app.use(morgan("dev"));

// Middleware
app.use(express.json({ limit: "5mb" }));

// Static files uploads route
const uploadPath = path.join(__dirname, "../uploads");
app.use("/uploads", express.static(uploadPath));
fs.access(uploadPath, fs.constants.R_OK, (err: any) => {
  if (err) {
    console.error(`No read access to ${uploadPath}`);
  } else {
    console.log(`Read access confirmed for ${uploadPath}`);
  }
});
// Routes
app.use("/api/", Router);

// Home route
app.get("/", (_, res) => {
  res.status(200).json({
    status: "success",
    message: "Welcome to E-commerce app 🔥",
  });
});

// Error handling middleware
app.use(errorHandler);

// Routes

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT} 🔥`);
});
