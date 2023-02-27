import { Router } from "express";
import { createOrder, updateOrder } from "../../controllers/order.controllers";

const order_router: Router = Router();

order_router.post("/", createOrder);
order_router.put("/", updateOrder);

export default order_router;
