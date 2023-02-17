import { Router } from "express";
import category_router from "./api/category.route.api";
import product_router from "./api/product.route.api";

const routes: Router = Router();

routes.use("/category", category_router);
routes.use("/product", product_router);

export default routes;
