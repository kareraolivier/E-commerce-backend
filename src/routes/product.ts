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
import { isUuidValid } from "../middlewares/isUuidValid";

const router = Router();

router.get("/", getAllProducts);
router.get("/category/:id", getProductsByCategory);
router.get("/:id", isUuidValid, getProductById);
router.post(
  "/",
  upload.single("imageUrl"),
  validateDTO(createProductDto),
  createProduct
);
router.patch("/:id", isUuidValid, validateDTO(updateProductDto), updateProduct);
router.patch("/soft-delete/:id", isUuidValid, updateProduct);
router.delete("/:id", isUuidValid, deleteProduct);

export default router;
