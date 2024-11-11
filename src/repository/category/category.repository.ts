import { Category } from "../../../models/category";
import { Sequelize, QueryTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import { updateRecord } from "../../helpers/update.query";

export class CategoryRepository {
  private sequelize: Sequelize;
  constructor(sequelize: Sequelize) {
    this.sequelize = sequelize;
  }
  async fetchAllCategories(): Promise<Category[]> {
    const categories = await this.sequelize.query(
      'SELECT * FROM "Categories" ORDER BY id desc',
      {
        type: QueryTypes.SELECT,
      }
    );
    return categories as Category[];
  }

  async fetchCategoryById(id: string): Promise<Category> {
    const category = await this.sequelize.query(
      'SELECT * FROM "Categories" WHERE "id" = :id',
      {
        replacements: { id },
        type: QueryTypes.SELECT,
      }
    );
    return category[0] as Category;
  }

  async fetchCategoryByName(name: string): Promise<Category> {
    const category = await this.sequelize.query(
      'SELECT * FROM "Categories" WHERE "name" = :name',
      {
        replacements: { name },
        type: QueryTypes.SELECT,
      }
    );
    return category[0] as Category;
  }

  async createCategory(categoryData: Partial<Category>): Promise<Category> {
    const id = uuidv4();
    const result = await this.sequelize.query(
      'INSERT INTO "Categories" ("id", "name", "description", "imageUrl", "isDeleted", "isActive", "createdAt", "updatedAt") VALUES (:id, :name, :description, :imageUrl, :isDeleted, :isActive, :createdAt, :updatedAt) RETURNING *',
      {
        replacements: {
          id,
          ...categoryData,
          isActive: true,
          isDeleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        type: QueryTypes.INSERT,
      }
    );
    return result[0] as unknown as Category;
  }

  async updateCategory(id: string, categoryData: Partial<Category>) {
    return await updateRecord<Category>(
      this.sequelize,
      "Categories",
      id,
      categoryData
    );
  }

  async deleteCategory(id: string): Promise<void> {
    await this.sequelize.query('DELETE FROM "Categories" WHERE "id" = :id', {
      replacements: { id },
      type: QueryTypes.DELETE,
    });
  }
}
