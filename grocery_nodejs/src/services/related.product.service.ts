import { ProductModel } from "../models/product.model";
import {
  IRelatedProduct,
  IRelatedProductDocument,
  RelatedProductModel,
} from "../models/related-product.model";

export async function addRelatedProduct(
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

    await ProductModel.findOneAndUpdate(
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
    throw new Error(`Error can not add related Product: ${err}`);
  }
}

export async function removeRelatedProduct(id: string) {
  try {
    const relatedProduct = RelatedProductModel.findByIdAndRemove(id);
    return relatedProduct;
  } catch (err) {
    throw new Error(`Error can not remove related product ${err}`);
  }
}
