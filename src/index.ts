import express from "express";
import db from "../models";
import morgan from "morgan";
import Router from "./routes";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/errorHandler";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 8000;

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

// Logging with morgan
app.use(morgan("dev"));

// Middleware
app.use(express.json({ limit: "5mb" }));

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
