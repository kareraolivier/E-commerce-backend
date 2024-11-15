import { Router } from "express";
import {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
} from "../controllers/review/review.controller";
import {
  CreateReviewDTO,
  UpdateReviewDTO,
} from "../controllers/review/review.dto";
import { validateDTO } from "../middlewares/validation.middleware";
import { isUuidValid } from "../middlewares/isUuidValid";
import verifyToken from "../middlewares/authMiddleware";

const router = Router();

router.get("/", getAllReviews);
router.get("/:id", isUuidValid, getReviewById);
router.get("/product/:id", isUuidValid, getReviewById);
router.post("/", validateDTO(CreateReviewDTO), createReview);
router.patch(
  "/:id",
  verifyToken,
  isUuidValid,
  validateDTO(UpdateReviewDTO),
  updateReview
);
router.delete("/:id", verifyToken, isUuidValid, deleteReview);

export default router;
