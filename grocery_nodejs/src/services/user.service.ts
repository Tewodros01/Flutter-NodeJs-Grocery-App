import { IUser, IUserDocument, User } from "../models/user_model";
import bcrypt from "bcrypt";
import MONGO_DB_CONFIG from "../config/app.config";
import * as auth from "../middleware/auth";

export async function login(
  email: string,
  password: string
): Promise<string | null> {
  try {
    const user = await User.findOne({ email });
    if (
      user &&
      (await bcrypt.compare(
        password + MONGO_DB_CONFIG.BCRYPT_PASSWORD,
        user.password
      ))
    ) {
      const token = auth.generateAccessToken(user.toJSON());
      return token;
    }
    return null;
  } catch (err) {
    throw new Error(`Could not log in: ${err}`);
  }
}

export async function register(user: IUser): Promise<string> {
  try {
    if (!user.email) {
      throw new Error("Email is required");
    }

    const existingUser = await User.findOne({ email: user.email });
    if (existingUser) {
      throw new Error("Email already registered");
    }

    const hash = await bcrypt.hash(
      user.password + MONGO_DB_CONFIG.BCRYPT_PASSWORD,
      MONGO_DB_CONFIG.SALT_ROUND
    );
    user.password = hash;

    const newUser = new User(user);
    await newUser.save();
    const token = auth.generateAccessToken(newUser.toJSON());

    return token;
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
    const users = await User.find()
      .limit(perPage)
      .skip(perPage * page);
    return users as IUserDocument[];
  } catch (err) {
    throw new Error(`Could not get users ${err}`);
  }
}
