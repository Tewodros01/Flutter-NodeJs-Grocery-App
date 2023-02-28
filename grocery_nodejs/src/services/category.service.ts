import {
  CategoryModel,
  ICategoryDocument,
  ICategory,
} from "../models/category.model";
import { MONGO_DB_CONFIG } from "../config/app.config";

export async function getCategoryById(id: string): Promise<ICategoryDocument> {
  const category = await CategoryModel.findById(id).lean();
  return category as ICategoryDocument;
}

export async function getAllCategories(params: {
  categoryName?: string;
  pageSize?: string;
  page?: string;
}): Promise<ICategoryDocument[]> {
  try {
    const categoryName = params.categoryName;
    const condition = categoryName
      ? {
          categoryName: { $regex: new RegExp(categoryName), $options: "i" },
        }
      : {};

    const perPage =
      Math.abs(parseInt(params.pageSize!)) || MONGO_DB_CONFIG.PAGE_SIZE;
    const page = (Math.abs(parseInt(params.page!)) || 1) - 1;

    const categories = await CategoryModel.find(
      condition,
      "categoryName categoryImagePath"
    )
      .limit(perPage)
      .skip(perPage * page);

    return categories as ICategoryDocument[];
  } catch (err) {
    throw new Error(`Error retrieving categories: ${err}`);
  }
}

export async function createCategory(
  categoryType: ICategory
): Promise<ICategoryDocument> {
  const newCategory = new CategoryModel(categoryType);
  await newCategory.save();
  return newCategory as ICategoryDocument;
}

export async function updateCategoryById(
  id: string,
  categoryType: ICategory
): Promise<ICategoryDocument> {
  const updatedCategory = await CategoryModel.findByIdAndUpdate(
    id,
    categoryType,
    {
      new: true,
    }
  ).lean();
  return updatedCategory as ICategoryDocument;
}

export async function deleteCategoryById(
  id: string
): Promise<ICategoryDocument> {
  const category = await CategoryModel.findByIdAndDelete(id).lean();
  return category as ICategoryDocument;
}
