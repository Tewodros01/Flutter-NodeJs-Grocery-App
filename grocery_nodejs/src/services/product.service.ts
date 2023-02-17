import { FilterQuery } from "mongoose";
import { Product, IProductDocument, IProduct } from "../models/product.model";
import MONGO_DB_CONFIG from "../config/app.config";
import { ICategory } from "../models/category.model";

export async function getAllProducts(params: {
  pageSize?: string;
  page?: string;
  product_name?: string;
  category_id?: string;
  sort?: string;
}): Promise<IProductDocument[]> {
  try {
    const product_name: string = params.product_name!;
    const category_id: string = params.category_id!;
    const condition: FilterQuery<IProduct> = {};
    if (product_name) {
      condition["product_name"] = {
        $regex: new RegExp(product_name),
        $options: "i",
      };
    }
    if (category_id) {
      condition["category"] = category_id;
    }
    let perPage: number =
      Math.abs(parseInt(params.pageSize!)) || MONGO_DB_CONFIG.PAGE_SIZE;
    let page: number = (Math.abs(parseInt(params.page!)) || 1) - 1;

    const products: IProductDocument[] = await Product.find(
      condition,
      "product_id product_name product_short_description product_description product_price product_sale_price product_image_path product_SKU product_type stack_status createdAt updatedAt"
    )
      .sort(params.sort!)
      .populate(
        "category",
        "category_name category_description category_image_path"
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
    const newProduct: IProductDocument = new Product(productType);
    await newProduct.save();
    return newProduct;
  } catch (err) {
    throw new Error(`Could not create ${err}`);
  }
}

export async function getProductById(id: string): Promise<IProductDocument> {
  const product = await Product.findById(id).lean();
  return product as IProductDocument;
}

export async function updateProduct(
  id: string,
  productType: IProduct
): Promise<IProductDocument | null> {
  try {
    const updatedProduct: IProductDocument | null =
      await Product.findByIdAndUpdate(id, productType, { new: true }).lean();
    return updatedProduct;
  } catch (err) {
    throw new Error(`Could not update ${err}`);
  }
}

export async function deleteProduct(
  id: string
): Promise<IProductDocument | null> {
  try {
    const product: IProductDocument | null = await Product.findByIdAndDelete(
      id
    ).lean();
    return product;
  } catch (err) {
    throw new Error(`Could not delete ${err}`);
  }
}
