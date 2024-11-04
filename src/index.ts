import express from "express";
import { AppDataSource } from "./data-source";
import { sequelize } from "./sequelize";
import userRoutes from "./routes/user";
import { initializeUserModel } from "../models/user";
import morgan from "morgan";
const app = express();
const PORT = process.env.PORT || 3000;

// Initialize TypeORM
AppDataSource.initialize()
  .then(() => {
    console.log("TypeORM connected to the database");
    // You can also run migrations here if needed
  })
  .catch((error) => {
    console.error("Error initializing TypeORM:", error);
  });

// Initialize Sequelize and models
initializeUserModel(sequelize);
sequelize
  .sync()
  .then(() => {
    console.log("Sequelize connected to the database");
  })
  .catch((error) => {
    console.error("Unable to connect to the database with Sequelize:", error);
  });

// Middleware
app.use(express.json({ limit: "5mb" }));

// Home route
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Welcome to E-commerce app 🔥",
  });
});

// Logging with morgan
app.use(morgan("dev"));

// Routes
app.use("/api", userRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT} 🔥`);
});
