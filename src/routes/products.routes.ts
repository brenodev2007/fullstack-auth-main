import { Router } from "express";
import { ProductsController } from "@/controllers/products-controller";
import { ensureAuthenticated } from "@/middleware/ensureAuthenticated";

const productsRoutes = Router();
const productsController = new ProductsController();

productsRoutes.get("/", ensureAuthenticated, productsController.index);
productsRoutes.post("/", ensureAuthenticated, productsController.create);

export { productsRoutes };
