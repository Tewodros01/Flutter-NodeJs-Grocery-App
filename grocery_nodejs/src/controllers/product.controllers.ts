import { Request, Response } from "express";
import * as productService from "../services/product.service";
import { IProduct } from "../models/product.model";
import path from "path";
import fs from "fs-extra";

export async function createProduct(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const path = req.file != undefined ? req.file.path.replace(/\\/g, "/") : "";
    const product: IProduct = {
      productName: req.body.productName,
      category: req.body.category,
      productDescription: req.body.productDescription,
      productShortDescription: req.body.productShortDescription,
      productPrice: req.body.productPrice,
      productSalePrice: req.body.productSalePrice,
      productImagePath: path,
      productSKU: req.body.productSKU,
      productType: req.body.productType,
      stackStatus: req.body.stackStatus,
    };
    const newProduct = await productService.createProduct(product);
    res.json({ message: "success", data: newProduct });
  } catch (err) {
    res.status(400).json({ message: "error", error: `${err}` });
  }
}
export async function getAllProducts(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const product = await productService.getAllProducts({
      pageSize: req.query.pageSize?.toString(),
      page: req.query.page?.toString(),
      productName: req.query.productName?.toString(),
      categoryId: req.query.categoryId?.toString(),
      sortBy: req.query.sortBy?.toString(),
    });
    res.json({ message: "success", data: product });
  } catch (err) {
    res.status(400).json({ message: "error", error: `${err}` });
  }
}

export async function getProductById(
  req: Request,
  res: Response
): Promise<void> {
  const category = await productService.getProductById(req.params.id);
  res.json(category);
}

export async function updateProductById(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { id } = req.params;
    const product: IProduct = {
      productName: req.body.productName,
      category: req.body.category,
      productDescription: req.body.productDescription,
      productShortDescription: req.body.productShortDescription,
      productPrice: req.body.productPrice,
      productSalePrice: req.body.productSalePrice,
      productSKU: req.body.productSKU,
      productType: req.body.productType,
      stackStatus: req.body.stackStatus,
    };
    const updatedCategory = await productService.updateProduct(id, product);
    res.json({ message: "success", data: updatedCategory });
  } catch (err) {
    res.status(400).json({ message: "error", error: `${err}` });
  }
}

export async function deleteProductById(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const product = await productService.deleteProduct(req.params.id);
    if (product && product.productImagePath) {
      await fs.unlink(path.resolve(product.productImagePath));
    }
    res.json({ message: "success", data: product });
  } catch (err) {
    res.status(400).json({ message: "error", error: `${err}` });
  }
}
