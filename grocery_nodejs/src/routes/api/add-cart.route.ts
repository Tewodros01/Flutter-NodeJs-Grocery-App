import { Router } from "express";
import {
  createCart,
  removeProductFromCart,
} from "../../controllers/cart.controllers";

const add_cart_router: Router = Router();
add_cart_router.post("/", createCart);
add_cart_router.delete("/", removeProductFromCart);

export default add_cart_router;
