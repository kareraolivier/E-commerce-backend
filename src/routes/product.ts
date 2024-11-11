import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getAllProducts,
  getProductsByCategory,
  updateProduct,
} from "../controllers/product/product.controller";
import {
  createProductDto,
  updateProductDto,
} from "../controllers/product/product.dto";
import { validateDTO } from "../middlewares/validation.middleware";
import { upload } from "../middlewares/upload.image";

const router = Router();

router.get("/", getAllProducts);
router.get("/category/:id", getProductsByCategory);
router.get("/:id", getProductById);
router.post(
  "/",
  upload.single("imageUrl"),
  validateDTO(createProductDto),
  createProduct
);
router.patch("/:id", validateDTO(updateProductDto), updateProduct);
router.patch("/soft-delete/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
