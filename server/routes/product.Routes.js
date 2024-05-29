import express from "express";
import {
  createProductController,
  getProductController,
  getSingleProductController,
  productPhotoController,
  deleteProductController,
  updateProductController,
} from "../controllers/productController.js";

import formidable from "express-formidable";

const router = express.Router();

// product route
router.post("/createProduct", formidable(), createProductController);
router.get("/product-photo/:pid", productPhotoController);
router.get("/getallProduct", getProductController);
router.delete("/deleteProduct/:pid", deleteProductController);

//single product
router.get("/get-product/:pid", getSingleProductController);
router.put("/updateProduct/:id", updateProductController);

export default router;
