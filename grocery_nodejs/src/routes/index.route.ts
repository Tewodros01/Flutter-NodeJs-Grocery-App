import { Router } from "express";
import category_router from "./api/category.route.api";
import product_router from "./api/product.route.api";
import user_router from "./api/user_routes";

const routes: Router = Router();

routes.use("/category", category_router);
routes.use("/product", product_router);
routes.use("/user", user_router);

export default routes;
