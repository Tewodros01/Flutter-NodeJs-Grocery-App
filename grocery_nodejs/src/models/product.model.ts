import mongoose, { Model, Schema, Document } from "mongoose";

interface IProduct {
  productName: string;
  category?: mongoose.Types.ObjectId;
  productShortDescription: string;
  productDescription: string;
  productPrice: number;
  productSalePrice?: number;
  productImagePath?: string;
  productSKU?: string;
  productType: string;
  stackStatus: boolean;
}

interface IProductDocument extends Document, IProduct {
  productId: string;
}

const productSchema: Schema = new Schema(
  {
    productName: { type: String, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    productShortDescription: { type: String, required: true },
    productDescription: { type: String, required: true },
    productPrice: { type: Number, required: true },
    productSalePrice: { type: Number, default: 0 },
    productImagePath: { type: String },
    productSKU: { type: String, required: true },
    productType: { type: String, default: "Simple" },
    stackStatus: { type: String, default: "IN" },
    relatedProducts: [{ type: mongoose.Types.ObjectId, ref: "RelatedProduct" }],
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        ret.productId = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

const ProductModel: Model<IProductDocument> = mongoose.model<IProductDocument>(
  "Product",
  productSchema
);

export { ProductModel, IProduct, IProductDocument };
