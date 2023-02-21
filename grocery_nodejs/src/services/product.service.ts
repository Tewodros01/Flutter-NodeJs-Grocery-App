import { FilterQuery } from "mongoose";
import {
  ProductModel,
  IProductDocument,
  IProduct,
} from "../models/product.model";
import MONGO_DB_CONFIG from "../config/app.config";

export async function getAllProducts(params: {
  pageSize?: string;
  page?: string;
  productName?: string;
  categoryId?: string;
  sortBy?: string;
}): Promise<IProductDocument[]> {
  try {
    const productName: string = params.productName!;
    const categoryId: string = params.categoryId!;
    const condition: FilterQuery<IProduct> = {};
    if (productName) {
      condition["productName"] = {
        $regex: new RegExp(productName),
        $options: "i",
      };
    }
    if (categoryId) {
      condition["category"] = categoryId;
    }
    let perPage: number =
      Math.abs(parseInt(params.pageSize!)) || MONGO_DB_CONFIG.PAGE_SIZE;
    let page: number = (Math.abs(parseInt(params.page!)) || 1) - 1;

    const products: IProductDocument[] = await ProductModel.find(
      condition,
      "productId productName productShortDescription productDescription productPrice productSalePrice productImagePath productSKU productType stackStatus createdAt updatedAt"
    )
      .sort(params.sortBy!)
      .populate(
        "category",
        "categoryName categoryDescription categoryImagePath"
      )
      .limit(perPage)
      .skip(perPage * page);

    return products;
  } catch (err) {
    throw new Error(`Could not get ${err}`);
  }
}

export async function createProduct(
  productType: IProduct
): Promise<IProductDocument> {
  try {
    const newProduct: IProductDocument = new ProductModel(productType);
    await newProduct.save();
    return newProduct;
  } catch (err) {
    throw new Error(`Could not create ${err}`);
  }
}

export async function getProductById(id: string): Promise<IProductDocument> {
  const product = await ProductModel.findById(id).lean();
  return product as IProductDocument;
}

export async function updateProduct(
  id: string,
  productType: IProduct
): Promise<IProductDocument | null> {
  try {
    const updatedProduct: IProductDocument | null =
      await ProductModel.findByIdAndUpdate(id, productType, {
        new: true,
      }).lean();
    return updatedProduct;
  } catch (err) {
    throw new Error(`Could not update ${err}`);
  }
}

export async function deleteProduct(
  id: string
): Promise<IProductDocument | null> {
  try {
    const product: IProductDocument | null =
      await ProductModel.findByIdAndDelete(id).lean();
    return product;
  } catch (err) {
    throw new Error(`Could not delete ${err}`);
  }
}
