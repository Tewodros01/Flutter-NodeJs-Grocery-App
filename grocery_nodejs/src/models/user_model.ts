import mongoose, { Model, Schema, Document } from "mongoose";

interface IUser {
  full_name: string;
  email: string;
  password: string;
}

interface IUserDocument extends Document, IUser {
  user_id: string;
}

const userSchema = new Schema<IUserDocument>(
  {
    full_name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    toJSON: {
      transform: function (dec, ret) {
        ret.user_id = ret._id.toString();
        delete ret._id;
        delete ret._v;
      },
    },
  }
);
const User: Model<IUserDocument> = mongoose.model<IUserDocument>(
  "User",
  userSchema
);

export { IUser, IUserDocument, User };
