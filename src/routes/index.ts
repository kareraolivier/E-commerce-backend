import { Router } from "express";
import userRoutes from "./user";
import AuthRoutes from "./auth";
import verifyToken from "../middlewares/authMiddleware";

const router = Router();

// Register all routes
router.use("/auth", AuthRoutes);
router.use("/users", verifyToken, userRoutes);
router.use("/categories", verifyToken, userRoutes);

export default router;
