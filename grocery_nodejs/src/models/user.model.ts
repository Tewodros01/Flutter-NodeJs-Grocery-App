import mongoose, { Model, Schema, Document } from "mongoose";

interface IUser {
  fullName: string;
  email: string;
  password: string;
}

interface IUserDocument extends Document, IUser {
  userId: string;
  token: string;
}

const userSchema = new Schema<IUserDocument>(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    token: { type: String, required: true },
  },
  {
    toJSON: {
      transform: function (dec, ret) {
        ret.userId = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);
const UserModel: Model<IUserDocument> = mongoose.model<IUserDocument>(
  "User",
  userSchema
);

export { IUser, IUserDocument, UserModel };
