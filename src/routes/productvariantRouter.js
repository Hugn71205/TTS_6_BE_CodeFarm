import express from "express";
import { createProductVariant, getAllProductVariants, getProductVariantById, updateProductVariant, deleteProductVariant  } from "../controllers/ProductVariantController.js";


const ProductVariantRouter = express.Router();
ProductVariantRouter.post("/", createProductVariant);
ProductVariantRouter.get("/", getAllProductVariants);
ProductVariantRouter.get("/:id", getProductVariantById);
ProductVariantRouter.put("/:id", updateProductVariant);
ProductVariantRouter.delete("/:id", deleteProductVariant);

export default ProductVariantRouter;
