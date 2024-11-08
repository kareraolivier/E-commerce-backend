import db from "../../../models";
import { Category } from "../../../models/category";
import { CategoryRepository } from "../../repository/category/category.repository";
import { v4 as uuidv4 } from "uuid";

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
    const category = await this.categoryRepository.fetchCategoryById(id);
    return category;
  }
  async getCategoryByName(name: string): Promise<Category> {
    const category = await this.categoryRepository.fetchCategoryByName(name);
    return category;
  }
  async createCategory(categoryData: Partial<Category>): Promise<Category> {
    const category = await this.categoryRepository.createCategory(categoryData);
    return category;
  }
  async updateCategory(
    id: string,
    categoryData: Partial<Category>
  ): Promise<Partial<Category>> {
    const category = await this.categoryRepository.updateCategory(
      id,
      categoryData
    );
    return category as Partial<Category>;
  }
  async deleteCategory(id: string): Promise<void> {
    await this.categoryRepository.deleteCategory(id);
  }
}

const categoryRepository = new CategoryRepository(db.sequelize);
export const categoryService = new CategoryService(categoryRepository);
