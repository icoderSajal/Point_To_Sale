import express from "express";

import {
  createCategory,
  getAllcategory,
  deleteCategory,
  singleCategory,
  updateCategory,
} from "./../controllers/categoryController.js";

const router = express.Router();

//routes
// create category
router.post("/create-category", createCategory);

//update category
router.put("/update-category/:id", updateCategory);

//getALl category
router.get("/get-Allcategory", getAllcategory);

//single category
router.get("/single-category/:id", singleCategory);

//delete category
router.delete("/delete-category/:id", deleteCategory);

export default router;
