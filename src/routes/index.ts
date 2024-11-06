import { Router } from "express";
import userRoutes from "./user";
import AuthRoutes from "./auth";

const router = Router();

// Register all routes
router.use("/users", userRoutes);
router.use("/auth", AuthRoutes);

export default router;
