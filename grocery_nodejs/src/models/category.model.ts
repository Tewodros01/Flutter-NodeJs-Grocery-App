import mongoose, { Model, Schema, Document } from "mongoose";

interface ICategory {
  category_name: string;
  category_description: string;
  category_image_path?: string;
}

interface ICategoryDocument extends ICategory, Document {
  category_id: string;
}

const categorySchema = new Schema<ICategoryDocument>(
  {
    category_name: { type: String },
    category_description: { type: String },
    category_image_path: { type: String },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        ret.category_id = ret._id.toString();
        delete ret._id;
        delete ret._v;
      },
    },
  }
);

const Category: Model<ICategoryDocument> = mongoose.model<ICategoryDocument>(
  "Category",
  categorySchema
);

export { Category, ICategory, ICategoryDocument };
