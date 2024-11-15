import { Router } from "express";
import {
  getAllOrderItems,
  getOrderItemById,
  createOrderItem,
  updateOrderItem,
  deleteOrderItem,
} from "../controllers/item/orderItem.controller";
import {
  CreateOrderItemDTO,
  UpdateOrderItemDTO,
} from "../controllers/item/orderItem.dto";
import { validateDTO } from "../middlewares/validation.middleware";
import { isUuidValid } from "../middlewares/isUuidValid";
import verifyToken from "../middlewares/authMiddleware";

const router = Router();

router.get("/", getAllOrderItems);
router.get("/:id", isUuidValid, getOrderItemById);
router.post("/", validateDTO(CreateOrderItemDTO), createOrderItem);
router.patch(
  "/:id",
  verifyToken,
  isUuidValid,
  validateDTO(UpdateOrderItemDTO),
  updateOrderItem
);
router.delete("/:id", verifyToken, isUuidValid, deleteOrderItem);

export default router;
