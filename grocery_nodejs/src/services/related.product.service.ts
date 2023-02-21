import { Response } from "express";
import { ProductModel } from "../models/product.model";
import {
  IRelatedProduct,
  IRelatedProductDocument,
  RelatedProductModel,
} from "../models/related-product.model";

export async function add(
  relatedProduct: IRelatedProduct
): Promise<IRelatedProductDocument> {
  try {
    if (!relatedProduct.product) {
      throw new Error(`Product is required`);
    }
    if (!relatedProduct.relatedProduct) {
      throw new Error(`Related Product is required`);
    }

    const newRelatedProduct = new RelatedProductModel(relatedProduct);
    await newRelatedProduct.save();

    const product = await ProductModel.findByIdAndUpdate(
      relatedProduct.product,
      {
        $addToSet: {
          relatedProducts: newRelatedProduct._id,
        },
      },
      { new: true }
    );

    return newRelatedProduct;
  } catch (err) {
    throw new Error(`Error cannot add related Product: ${err}`);
  }
}
