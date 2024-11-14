import { Router } from "express";
import userRoutes from "./user";
import productRoutes from "./product";
import AuthRoutes from "./auth";
import categoryRoutes from "./category";
import orderRoutes from "./order";
import verifyToken from "../middlewares/authMiddleware";

const router = Router();

// Register all routes
router.use("/auth", AuthRoutes);
router.use("/users", verifyToken, userRoutes);
router.use("/orders", verifyToken, orderRoutes);
router.use("/categories", categoryRoutes);
router.use("/products", productRoutes);

export default router;
