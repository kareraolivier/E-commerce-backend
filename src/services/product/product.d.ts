import { Category } from "../../models/category";

export type IProduct = {
  title: string;
  imageUrl: string;
  description: string;
  price: string;
  categoryId: string;
  category?: Category;
  isDeleted: boolean;
  isAvailable: string;
};
