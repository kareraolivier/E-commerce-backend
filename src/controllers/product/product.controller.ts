import { Request, Response, NextFunction } from "express";
import { productService } from "../../services/product/product.service";

export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const product = await productService.getProductById(id);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productData: any = req.body;
    productData.imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
    const product = await productService.createProduct(productData);
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const productData: any = req.body;
    const updatedProduct = await productService.updateProduct(id, productData);
    res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await productService.deleteProduct(id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const getProductsByCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const products = await productService.getProductsByCategory(id);
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};
