import { Router } from "express";
import {
  addRelatedProduct,
  removeRelatedProduct,
} from "../../controllers/related-product.controllers";

const related_product: Router = Router();

related_product.post("/", addRelatedProduct);
related_product.delete("/:id", removeRelatedProduct);

export default related_product;
