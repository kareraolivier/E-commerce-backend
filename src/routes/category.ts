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

const router = Router();

router.get("/", getCategories);
router.get("/:id", getCategoryById);
router.post("/", validateDTO(CreateCategoryDTO), createCategory);
router.patch("/:id", validateDTO(UpdateCategoryDTO), updateCategory);
router.delete("/:id", deleteCategory);

export default router;
