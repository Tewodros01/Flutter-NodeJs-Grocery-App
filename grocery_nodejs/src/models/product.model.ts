import mongoose, { Model, Schema, Document } from "mongoose";

interface IProduct {
  product_name: string;
  category?: mongoose.Types.ObjectId;
  product_short_description: string;
  product_description: string;
  product_price: number;
  product_sale_price?: number;
  product_image_path?: string;
  product_SKU?: string;
  product_type: string;
  stack_status: boolean;
}

interface IProductDocument extends Document, IProduct {}

const productSchema: Schema = new Schema(
  {
    product_name: { type: String, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    product_short_description: { type: String, required: true },
    product_description: { type: String, required: true },
    product_price: { type: Number, required: true },
    product_sale_price: { type: Number, default: 0 },
    product_image_path: { type: String },
    product_SKU: { type: String, required: true },
    product_type: { type: String, default: "Simple" },
    stack_status: { type: String, default: "IN" },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        ret.product_id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

const Product: Model<IProductDocument> = mongoose.model<IProductDocument>(
  "Product",
  productSchema
);

export { Product, IProduct, IProductDocument };
