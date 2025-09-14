import { Router } from "express";
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";

export const categoryRoutes = Router();

categoryRoutes.post("/categories", createCategory);
categoryRoutes.get("/categories", getCategories);
categoryRoutes.put("/categories/:id", updateCategory);
categoryRoutes.delete("/categories/:id", deleteCategory);
