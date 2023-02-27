import { Types } from "mongoose";
import { IProductDocument } from "../models/product.model";

export interface ICartItem {
  product: IProductDocument;
  qty: number;
}
