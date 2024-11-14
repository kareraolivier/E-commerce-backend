import { Router } from "express";
import userRoutes from "./user";
import productRoutes from "./product";
import AuthRoutes from "./auth";
import categoryRoutes from "./category";
import orderRoutes from "./order";
import itemRoutes from "./orderItem";
import verifyToken from "../middlewares/authMiddleware";

const router = Router();

// Register all routes
router.use("/auth", AuthRoutes);
router.use("/users", verifyToken, userRoutes);
router.use("/orders", orderRoutes);
// router.use("/reviews", reviewRoutes);
router.use("/items", itemRoutes);
router.use("/categories", categoryRoutes);
router.use("/products", productRoutes);

export default router;
