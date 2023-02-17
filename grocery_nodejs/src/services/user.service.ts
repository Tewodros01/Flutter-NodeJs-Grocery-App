import { IUser, IUserDocument, User } from "../models/user_model";
import bcrypt from "bcrypt";

export async function createUser(user: IUser): Promise<IUserDocument> {
  try {
    const newUser = new User(user);
    await newUser.save();
    return newUser as IUserDocument;
  } catch (err) {
    throw new Error(`Could not create user ${err}`);
  }
}

export async function getAllUser(params: { pageSize?: string; page?: string }) {
  try {
  } catch (err) {
    throw new Error(`Could not get ${err}`);
  }
}
