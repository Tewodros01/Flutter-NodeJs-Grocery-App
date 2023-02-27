import { FilterQuery, LeanDocument } from "mongoose";
import {
  productModel,
  IProductDocument,
  IProduct,
} from "../models/product.model";
import MONGO_DB_CONFIG from "../config/app.config";
import { IRelatedProduct } from "../models/related-product.model";
import { GetAllProductsParams } from "../interface/product_params.inteface";

export async function getAllProducts(
  params: GetAllProductsParams
): Promise<IProductDocument[]> {
  try {
    const productId: string = params.productIds ?? "";
    const productName: string = params.productName ?? "";
    const categoryId: string = params.categoryId ?? "";
    const condition: FilterQuery<IProduct> = {};
    if (productName) {
      condition.productName = {
        $regex: new RegExp(productName, "i"),
      };
    }
    if (categoryId) {
      condition.category = categoryId;
    }
    if (productId) {
      condition._id = {
        $in: productId.split(","),
      };
    }
    const perPage: number =
      Math.abs(parseInt(params.pageSize ?? "", 10)) ||
      MONGO_DB_CONFIG.PAGE_SIZE;
    const page: number = (Math.abs(parseInt(params.page ?? "", 10)) || 1) - 1;

    const products: unknown | IProductDocument[] = await productModel
      .find(condition)
      .select(
        "productId productName productShortDescription productDescription productPrice productSalePrice productImagePath productSKU productType stackStatus createdAt updatedAt"
      )
      .sort(params.sortBy ?? "")
      .populate(
        "category",
        "categoryName categoryDescription categoryImagePath"
      )
      .populate("relatedProducts", "relatedProduct")
      .limit(perPage)
      .skip(perPage * page);

    let modifideProducts = (
      Array.isArray(products) ? products : [products]
    ).map((p) => {
      if (p.relatedProducts.length > 0) {
        p.relatedProducts = p.relatedProducts.map(
          (x: { relatedProduct: IRelatedProduct }) => x.relatedProduct
        );
      }
      return p;
    });

    return modifideProducts;
  } catch (err) {
    throw new Error(`Could not get products: ${err}`);
  }
}

export async function createProduct(
  productType: IProduct
): Promise<IProductDocument> {
  try {
    const newProduct: IProductDocument = new productModel(productType);
    await newProduct.save();
    return newProduct;
  } catch (err) {
    throw new Error(`Could not create ${err}`);
  }
}

export async function getProductById(
  productId: string
): Promise<IProductDocument> {
  try {
    const product = await productModel
      .findById(productId)
      .populate(
        "category",
        "categoryName categoryDescription categoryImagePath"
      )
      .populate("relatedProducts", "relatedProduct");
    if (!product) {
      throw new Error(`Product is null`);
    }
    product.relatedProducts =
      product.relatedProducts.map(
        (x) => x.relatedProduct as unknown as IRelatedProduct
      ) ?? [];

    return product;
  } catch (err) {
    throw new Error(`${err}`);
  }
}

export async function updateProduct(
  id: string,
  productType: IProduct
): Promise<IProductDocument> {
  try {
    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      productType,
      {
        new: true,
      }
    );
    return updatedProduct as IProductDocument;
  } catch (err) {
    throw new Error(`Could not update ${err}`);
  }
}

export async function deleteProduct(
  id: string
): Promise<LeanDocument<IProductDocument> | null> {
  try {
    const product: LeanDocument<IProductDocument> | null = await productModel
      .findByIdAndDelete(id)
      .lean();
    return product;
  } catch (err) {
    throw new Error(`Could not delete ${err}`);
  }
}
