import { Product } from "../../../models/product";
import { Sequelize, QueryTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import { updateRecord } from "../../helpers/update.query";

export class ProductRepository {
  constructor(private sequelize: Sequelize) {
    this.sequelize = sequelize;
  }

  async fetchAllProducts(): Promise<Product[]> {
    const products = await this.sequelize.query(
      'SELECT * FROM "Products" WHERE "isDeleted" = false',
      { type: QueryTypes.SELECT }
    );
    return products as Product[];
  }

  async fetchProductById(id: string): Promise<Product> {
    const product = await this.sequelize.query(
      'SELECT * FROM "Products" WHERE id = :id',
      {
        replacements: { id },
        type: QueryTypes.SELECT,
      }
    );
    return product[0] as Product;
  }

  async fetchProductsByCategory(categoryId: string): Promise<Product[]> {
    const products = await this.sequelize.query(
      'SELECT * FROM "Products" WHERE "categoryId" = :categoryId AND "isDeleted" = false',
      {
        replacements: { categoryId },
        type: QueryTypes.SELECT,
      }
    );
    return products as Product[];
  }

  async createProduct(productData: Partial<Product>): Promise<Product> {
    const id = uuidv4();
    const result = await this.sequelize.query(
      'INSERT INTO "Products" ("id", "title", "description", "price", "imageUrl", "categoryId", "isAvailable", "isDeleted", "createdAt", "updatedAt") VALUES (:id, :title, :description, :price, :imageUrl, :categoryId, :isAvailable, :isDeleted, :createdAt, :updatedAt) RETURNING *',
      {
        replacements: {
          id,
          ...productData,
          isAvailable: true,
          isDeleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        type: QueryTypes.INSERT,
      }
    );
    return result[0] as unknown as Product;
  }

  async updateProduct(
    id: string,
    productData: Partial<Product>
  ): Promise<Product> {
    const product = await updateRecord<Product>(
      this.sequelize,
      "Products",
      id,
      productData
    );
    return product as unknown as Product;
  }

  async softDeleteProduct(id: string): Promise<void> {
    await this.sequelize.query(
      'UPDATE "Products" SET "isDeleted" = true WHERE id = :id',
      { replacements: { id }, type: QueryTypes.UPDATE }
    );
  }

  async deleteProduct(id: string): Promise<void> {
    await this.sequelize.query('DELETE FROM "Products" WHERE id = :id', {
      replacements: { id },
      type: QueryTypes.DELETE,
    });
  }
}
