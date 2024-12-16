import db from "../../../models";
import { Category } from "../../../models/category";
import { ConflictError, NotFoundError } from "../../errors/AppErrors";
import { CategoryRepository } from "../../repository/category/category.repository";
import { ICategory } from "./category";

const categoryRepository = new CategoryRepository(db.sequelize);
class CategoryService {
  private categoryRepository: CategoryRepository;
  constructor(categoryRepository: CategoryRepository) {
    this.categoryRepository = categoryRepository;
  }
  async getAllCategories(): Promise<Category[]> {
    const categories = await this.categoryRepository.fetchAllCategories();
    return categories;
  }
  async getCategoryById(id: string): Promise<Category> {
    try {
      const category = await this.categoryRepository.fetchCategoryById(id);
      if (!category) {
        throw new NotFoundError("Category not found");
      }
      return category;
    } catch (error) {
      throw error;
    }
  }
  async getCategoryByName(name: string): Promise<Category> {
    const category = await this.categoryRepository.fetchCategoryByName(name);
    if (category) {
      throw new ConflictError("Category already exists");
    }
    return category;
  }
  async createCategory(categoryData: ICategory): Promise<Category> {
    await this.getCategoryByName(categoryData.name);
    const category = await this.categoryRepository.createCategory(categoryData);
    return category;
  }
  async updateCategory(
    id: string,
    categoryData: Partial<Category>
  ): Promise<Partial<Category>> {
    await this.getCategoryById(id);
    const category = await this.categoryRepository.updateCategory(
      id,
      categoryData
    );
    return category as Category;
  }

  async softDeleteCategory(id: string): Promise<void> {
    await this.getCategoryById(id);
    await this.categoryRepository.softDeleteCategory(id);
  }

  async deleteCategory(id: string): Promise<void> {
    await this.getCategoryById(id);
    await this.categoryRepository.deleteCategory(id);
  }
}

export const categoryService = new CategoryService(categoryRepository);
