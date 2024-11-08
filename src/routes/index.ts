import { Router } from "express";
import userRoutes from "./user";
import AuthRoutes from "./auth";
import categoryRoutes from "./category";
import verifyToken from "../middlewares/authMiddleware";

const router = Router();

// Register all routes
router.use("/auth", AuthRoutes);
router.use("/users", verifyToken, userRoutes);
router.use("/categories", verifyToken, categoryRoutes);

export default router;
