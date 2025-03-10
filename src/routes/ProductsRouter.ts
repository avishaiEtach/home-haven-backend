import express from "express";
import ProductController from "../controllers/ProductController";
const router = express.Router();

router.get("/getProductById/:id", ProductController.getProductById);
router.post("/products", ProductController.getProducts);
router.post("/createProduct", ProductController.createProduct);

const ProductsRouter = router;

export default ProductsRouter;
