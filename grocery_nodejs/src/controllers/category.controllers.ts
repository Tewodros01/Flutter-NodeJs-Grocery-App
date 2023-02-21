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
    categoryName: req.body.categoryName,
    categoryDescription: req.body.categoryDescription,
    categoryImagePath: filePath,
  };
  const newCategory = await categoryService.createCategory(categoryType);
  res.json({ message: "success", data: newCategory });
}

export async function getCategories(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const categories = await categoryService.getAllCategories({
      pageSize: req.query.pageSize?.toString(),
      page: req.query.page?.toString(),
      categoryName: req.query.categoryName?.toString(),
    });
    res.json({ message: "success", data: categories });
  } catch (err) {
    res.status(400).json({ message: "error", error: `${err}` });
  }
}

export async function getCategoryById(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const category = await categoryService.getCategoryById(req.params.id);

    res.json({ message: "success", data: category });
  } catch (err) {
    res.status(400).json({ message: "error", error: `${err}` });
  }
}

export async function updateCategoryById(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { id } = req.params;
    const categoryType: ICategory = {
      categoryName: req.body.categoryName,
      categoryDescription: req.body.categoryDescription,
    };
    const updatedCategory = await categoryService.updateCategoryById(
      id,
      categoryType
    );
    res.json({ message: "success", data: updatedCategory });
  } catch (err) {
    res.status(400).json({ message: "error", error: `${err}` });
  }
}

export async function deleteCategoryById(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const category = await categoryService.deleteCategoryById(req.params.id);
    if (category && category.categoryImagePath) {
      await fs.unlink(path.resolve(category.categoryImagePath));
    } else {
      res.status(404).json({ message: "Category not found" });
    }
    res.json({ message: "success", data: category });
  } catch (err) {
    res.status(400).json({ message: "error", error: `${err}` });
  }
}
