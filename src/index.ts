import express from "express";
import { sequelize } from "./sequelize";
import { initializeUserModel } from "../models/user";
import morgan from "morgan";
import Router from "./routes";
import dotenv from "dotenv";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 8000;

// Initialize Sequelize and models
initializeUserModel(sequelize);
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Sequelize connected to the database");
  })
  .catch((error) => {
    console.error("Unable to connect to the database with Sequelize:", error);
  });

// Middleware
app.use(express.json({ limit: "5mb" }));

app.use("/api/", Router);

// Home route
app.get("/", (_, res) => {
  res.status(200).json({
    status: "success",
    message: "Welcome to E-commerce app 🔥",
  });
});

// Logging with morgan
app.use(morgan("dev"));

// Routes

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT} 🔥`);
});
