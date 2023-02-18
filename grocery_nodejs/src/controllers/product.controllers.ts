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
      product_name: req.body.product_name,
      category: req.body.category,
      product_short_description: req.body.product_short_description,
      product_description: req.body.product_description,
      product_price: req.body.product_price,
      product_sale_price: req.body.product_sale_price,
      product_image_path: path,
      product_SKU: req.body.product_SKU,
      product_type: req.body.product_type,
      stack_status: req.body.stack_status,
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
      product_name: req.query.product_name?.toString(),
      category_id: req.query.category_id?.toString(),
      sort: req.query.sort?.toString(),
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
      product_name: req.body.product_name,
      product_short_description: req.body.product_short_description,
      product_description: req.body.product_description,
      product_price: req.body.product_price,
      product_sale_price: req.body.product_sale_price,
      product_SKU: req.body.product_SKU,
      product_type: req.body.product_type,
      stack_status: req.body.stack_status,
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
    if (product && product.product_image_path) {
      await fs.unlink(path.resolve(product.product_image_path));
    }
    res.json({ message: "success", data: product });
  } catch (err) {
    res.status(400).json({ message: "error", error: `${err}` });
  }
}
