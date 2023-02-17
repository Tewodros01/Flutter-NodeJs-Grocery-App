import { Request, Response } from "express";
import * as categoryService from "../services/category.service";
import path from "path";
import fs from "fs-extra";
import { ICategory } from "../models/category.model";

export async function createCategory(
  req: Request,
  res: Response
): Promise<void> {
  const filePath = req.file?.path?.replace(/\\/g, "/") || "";
  const categoryType: ICategory = {
    category_name: req.body.category_name,
    category_description: req.body.category_description,
    category_image_path: filePath,
  };
  const newCategory = await categoryService.createCategory(categoryType);
  res.json({
    message: "Category successfully saved",
    category: newCategory,
  });
}

export async function getCategory(req: Request, res: Response): Promise<void> {
  const categorys = await categoryService.getAllCategories({
    pageSize: req.query.pageSize?.toString(),
    page: req.query.page?.toString(),
    category_name: req.query.category_name?.toString(),
  });
  res.json(categorys);
}

export async function getCategoryById(
  req: Request,
  res: Response
): Promise<void> {
  const category = await categoryService.getCategoryById(req.params.id);
  res.json(category);
}

export async function updateCategoryById(
  req: Request,
  res: Response
): Promise<void> {
  const { id } = req.params;
  const categoryType: ICategory = {
    category_name: req.body.category_name,
    category_description: req.body.category_description,
  };
  const updatedCategory = await categoryService.updateCategoryById(
    id,
    categoryType
  );
  res.json({ message: "Successfully updated", category: updatedCategory });
}

export async function deleteCategoryById(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const category = await categoryService.deleteCategoryById(req.params.id);
    if (category && category.category_image_path) {
      await fs.unlink(path.resolve(category.category_image_path));
    } else {
      res.status(404).json({ message: "Category not found" });
    }
    res.json({ message: "Category deleted", category });
  } catch (error) {
    res.status(404).json({ error });
  }
}
