import {
  Category,
  ICategoryDocument,
  ICategory,
} from "../models/category.model";
import MONGO_DB_CONFIG from "../config/app.config";

export async function getCategoryById(id: string): Promise<ICategoryDocument> {
  const category = await Category.findById(id).lean();
  return category as ICategoryDocument;
}

export async function getAllCategories(params: {
  category_name?: string;
  pageSize?: string;
  page?: string;
}): Promise<ICategoryDocument[]> {
  try {
    const category_name = params.category_name;
    const condition = category_name
      ? {
          category_name: { $regex: new RegExp(category_name), $options: "i" },
        }
      : {};

    const perPage =
      Math.abs(parseInt(params.pageSize!)) || MONGO_DB_CONFIG.PAGE_SIZE;
    const page = (Math.abs(parseInt(params.page!)) || 1) - 1;

    const categories = await Category.find(
      condition,
      "category_name category_image_path"
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
  const newCategory = new Category(categoryType);
  await newCategory.save();
  return newCategory as ICategoryDocument;
}

export async function updateCategoryById(
  id: string,
  categoryType: ICategory
): Promise<ICategoryDocument> {
  const updatedCategory = await Category.findByIdAndUpdate(id, categoryType, {
    new: true,
  }).lean();
  return updatedCategory as ICategoryDocument;
}

export async function deleteCategoryById(
  id: string
): Promise<ICategoryDocument> {
  const category = await Category.findByIdAndDelete(id).lean();
  return category as ICategoryDocument;
}
