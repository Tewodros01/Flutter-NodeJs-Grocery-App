import { Request, Response } from "express";
import { IUserDocument } from "../models/user.model";
import * as addCartService from "../services/cart.service";

interface IRequest extends Request {
  user?: IUserDocument;
}

export async function createCart(req: IRequest, res: Response): Promise<void> {
  try {
    const userId = req.user?.userId; // or however you get the user ID from the request
    const product = req.body.product; // or however you get the product ID from the request

    const cart = await addCartService.addCart(userId!, product);
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ error: `${error}` });
  }
}

export async function removeProductFromCart(
  req: Request,
  res: Response
): Promise<void> {
  const { userId, productId } = req.body;
  try {
    const cart = await addCartService.removeCart(userId, productId);
    if (cart) {
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
