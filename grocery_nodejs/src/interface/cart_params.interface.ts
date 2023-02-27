import { Types } from "mongoose";

export interface ICartItem {
  product: Types.ObjectId;
  qty: number;
}
