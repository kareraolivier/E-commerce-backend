import { Router } from "express";
import {
  getAllOrders,
  getOrderById,
  createOrder,
  createCheckoutOrder,
  updateOrder,
  deleteOrder,
} from "../controllers/order/order.controller";
import { CreateOrderDTO, UpdateOrderDTO } from "../controllers/order/order.dto";
import { validateDTO } from "../middlewares/validation.middleware";
import verifyToken from "../middlewares/authMiddleware";

const router = Router();

router.get("/", verifyToken, getAllOrders);
router.get("/:id", verifyToken, getOrderById);
router.post("/", validateDTO(CreateOrderDTO), createOrder);
router.post("/checkout", verifyToken, createCheckoutOrder);
router.patch("/:id", validateDTO(UpdateOrderDTO), verifyToken, updateOrder);
router.delete("/:id", verifyToken, deleteOrder);

export default router;
