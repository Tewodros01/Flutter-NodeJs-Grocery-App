import { Router } from "express";
import cart_router from "./api/cart.routes";
import category_router from "./api/category.route.api";
import product_router from "./api/product.route.api";
import related_product from "./api/related-product.route";
import slider_route from "./api/slider_route";
import user_router from "./api/user_routes";

const routes: Router = Router();

routes.use("/category", category_router);
routes.use("/product", product_router);
routes.use("/user", user_router);
routes.use("/slider", slider_route);
routes.use("/related-product", related_product);
routes.use("/cart", cart_router);

export default routes;
