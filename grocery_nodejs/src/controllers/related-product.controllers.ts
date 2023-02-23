import { IRelatedProduct } from "../models/related-product.model";
import { Request, Response } from "express";
import * as relatedProductService from "../services/related.product.service";

export async function addRelatedProduct(req: Request, res: Response) {
  try {
    const relatedProduct: IRelatedProduct = {
      product: req.body.product,
      relatedProduct: req.body.relatedProduct,
    };
    const newRelatedProduct = await relatedProductService.addRelatedProduct(
      relatedProduct
    );
    res.json({ message: "success", data: newRelatedProduct });
  } catch (err) {
    throw new Error(`Colud not add ${err}`);
  }
}

export async function removeRelatedProduct(req: Request, res: Response) {
  try {
    const deletedRelatedProduct =
      await relatedProductService.removeRelatedProduct(req.body.id);
    return deletedRelatedProduct;
  } catch (err) {
    throw new Error(`Colud not delete ${err}`);
  }
}
