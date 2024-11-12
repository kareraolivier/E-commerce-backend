import { Router } from "express";
import {
  getCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/category/category.controller";
import {
  CreateCategoryDTO,
  UpdateCategoryDTO,
} from "../controllers/category/category.dto";
import { validateDTO } from "../middlewares/validation.middleware";
import { upload } from "../middlewares/upload.image";
import { isUuidValid } from "../middlewares/isUuidValid";

const router = Router();

router.get("/", getCategories);
router.get("/:id", isUuidValid, getCategoryById);
router.post(
  "/",
  upload.single("imageUrl"),
  validateDTO(CreateCategoryDTO),
  createCategory
);
router.patch(
  "/:id",
  isUuidValid,
  validateDTO(UpdateCategoryDTO),
  updateCategory
);
router.delete("/:id", isUuidValid, deleteCategory);

export default router;
