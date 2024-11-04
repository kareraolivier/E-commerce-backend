import { Router } from "express";
import userRoutes from "./user";

const router = Router();

// Register all routes
router.use("/users", userRoutes);

export default router;
