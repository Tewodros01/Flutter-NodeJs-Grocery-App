import { Router } from "express";
import {
  createCart,
  getCarts,
  removeProductFromCart,
} from "../../controllers/cart.controllers";
import { authenticationToken } from "../../middleware/auth";

const cart_router: Router = Router();
cart_router.get("/", authenticationToken, getCarts);
cart_router.post("/", authenticationToken, createCart);
cart_router.delete("/", authenticationToken, removeProductFromCart);

export default cart_router;
