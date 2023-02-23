import mongoose, { Model, Schema, Document, Types } from "mongoose";

interface IProduct {
  productName: string;
  category?: Types.ObjectId;
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
  relatedProducts: Types.ObjectId;
}

const productSchema: Schema = new Schema(
  {
    productName: { type: String, required: true },
    category: {
      type: Types.ObjectId,
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
    relatedProducts: [{ type: Types.ObjectId, ref: "RelatedProduct" }],
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        ret.productId = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

const ProductModel: Model<IProductDocument> = mongoose.model<IProductDocument>(
  "Product",
  productSchema
);

export { ProductModel, IProduct, IProductDocument };
