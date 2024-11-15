import { Router } from "express";
import AuthRoutes from "./auth";
import userRoutes from "./user";
import productRoutes from "./product";
import categoryRoutes from "./category";
import addressRoutes from "./address";
import reviewRoutes from "./review";
import orderRoutes from "./order";
import itemRoutes from "./orderItem";
import verifyToken from "../middlewares/authMiddleware";

const router = Router();

router.use("/auth", AuthRoutes);
router.use("/users", verifyToken, userRoutes);
router.use("/orders", orderRoutes);
router.use("/reviews", reviewRoutes);
router.use("/address", addressRoutes);
router.use("/items", itemRoutes);
router.use("/categories", categoryRoutes);
router.use("/products", productRoutes);

export default router;
