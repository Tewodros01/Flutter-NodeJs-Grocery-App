import { IUser, IUserDocument, UserModel } from "../models/user.model";
import bcrypt from "bcrypt";
import MONGO_DB_CONFIG from "../config/app.config";
import * as auth from "../middleware/auth";

export async function login(
  email: string,
  password: string
): Promise<string | null | IUserDocument> {
  try {
    const logInUser = await UserModel.findOne({ email });
    if (
      logInUser &&
      (await bcrypt.compare(
        password + MONGO_DB_CONFIG.BCRYPT_PASSWORD,
        logInUser.password
      ))
    ) {
      const token = auth.generateAccessToken(logInUser.toJSON());
      return logInUser;
    }
    return null;
  } catch (err) {
    throw new Error(`Could not log in: ${err}`);
  }
}

export async function register(newUser: IUser): Promise<IUserDocument> {
  try {
    if (!newUser.email) {
      throw new Error("Email is required");
    }

    const existingUser = await UserModel.findOne({ email: newUser.email });
    if (existingUser) {
      throw new Error("Email already registered");
    }

    const hash = await bcrypt.hash(
      newUser.password + MONGO_DB_CONFIG.BCRYPT_PASSWORD,
      MONGO_DB_CONFIG.SALT_ROUND
    );
    newUser.password = hash;

    const registorUser = new UserModel(newUser);
    const token = auth.generateAccessToken(registorUser.toJSON());
    registorUser.token = token; // Add token value to user object
    await registorUser.save(); // Save user object to the database

    return registorUser;
  } catch (err) {
    throw new Error(`Could not create user ${err}`);
  }
}

export async function getAllUser(params: {
  pageSize?: string;
  page?: string;
}): Promise<IUserDocument[]> {
  try {
    const perPage =
      Math.abs(parseInt(params.pageSize ?? "")) || MONGO_DB_CONFIG.PAGE_SIZE;
    const page = (Math.abs(parseInt(params.page ?? "")) || 1) - 1;
    const users = await UserModel.find()
      .limit(perPage)
      .skip(perPage * page);
    return users;
  } catch (err) {
    throw new Error(`Could not get users ${err}`);
  }
}

export async function deletUser(id: String): Promise<IUserDocument> {
  try {
    console.log(id);
    const deletedUser = await UserModel.findByIdAndDelete(id).lean();
    return deletedUser as IUserDocument;
  } catch (err) {
    throw new Error(`Could not dlete ${err}`);
  }
}
