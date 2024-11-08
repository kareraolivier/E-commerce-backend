import { Category } from "../../../models/category";
import { Sequelize, QueryTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";

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
      'INSERT INTO "Categories" ("id", "name", "description", "isDeleted", "isActive") VALUES (:id, :name, :description, :isDeleted, :isActive) RETURNING *',
      {
        replacements: {
          id,
          ...categoryData,
          isActive: true,
          isDeleted: false,
        },
        type: QueryTypes.INSERT,
      }
    );
    return result[0] as unknown as Category;
  }

  async updateCategory(
    id: string,
    categoryData: Partial<Category>
  ): Promise<Partial<Category>> {
    const result = await this.sequelize.query(
      'UPDATE "Categories" SET "name" = :name, "description" = :description, "isDeleted" = :isDeleted, "isActive" = :isActive WHERE "id" = :id RETURNING *',
      {
        replacements: {
          ...categoryData,
          id,
        },
        type: QueryTypes.UPDATE,
      }
    );
    return result[0] as unknown as Category;
  }

  async deleteCategory(id: string): Promise<void> {
    await this.sequelize.query('DELETE FROM "Categories" WHERE "id" = :id', {
      replacements: { id },
      type: QueryTypes.DELETE,
    });
  }
}
