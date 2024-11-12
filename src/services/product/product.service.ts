import db from "../../../models";
import { NotFoundError } from "../../errors/AppErrors";
import { ProductRepository } from "../../repository/product/product.repository";
import { categoryService } from "../category/category.service";
import { IProduct } from "./product";

export class ProductService {
  private productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }
  async getAllProducts(): Promise<IProduct[]> {
    const products = await this.productRepository.fetchAllProducts();
    return products;
  }

  async getProductById(id: string): Promise<IProduct> {
    const product = await this.productRepository.fetchProductById(id);
    !product && new NotFoundError("Product not found");
    return product;
  }

  async getProductsByCategory(categoryId: string): Promise<IProduct[]> {
    const products = await this.productRepository.fetchProductsByCategory(
      categoryId
    );
    return products;
  }

  async createProduct(productData: IProduct): Promise<IProduct> {
    await categoryService.getCategoryById(productData.categoryId);
    const product = await this.productRepository.createProduct(productData);
    return product;
  }

  async updateProduct(
    id: string,
    productData: Partial<IProduct>
  ): Promise<IProduct> {
    await this.getProductById(id);
    const product = await this.productRepository.updateProduct(id, productData);
    return product;
  }

  async softDeleteProduct(id: string): Promise<void> {
    await this.getProductById(id);
    await this.productRepository.softDeleteProduct(id);
  }

  async deleteProduct(id: string): Promise<void> {
    await this.getProductById(id);
    await this.productRepository.deleteProduct(id);
  }
}

// Create an instance of ProductRepository
const productRepository = new ProductRepository(db.sequelize);
export const productService = new ProductService(productRepository);
