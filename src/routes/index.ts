import { Router } from "express";
import userRoutes from "./user";
import AuthRoutes from "./auth";
import verifyToken from "../middlewares/authMiddleware";

const router = Router();

// Register all routes
router.use("/users", verifyToken, userRoutes);
router.use("/auth", AuthRoutes);

export default router;
