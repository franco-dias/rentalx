import { Router } from "express";
import multer from "multer";

import { createCategoryController } from "../modules/cars/useCases/createCategory";
import { importCategoriesController } from "../modules/cars/useCases/importCategory";
import { listCategoriesController } from "../modules/cars/useCases/listCategories";

const categoryRoutes = Router();

const upload = multer({
  dest: "./tmp",
});

categoryRoutes.post("/", (req, res) => {
  return createCategoryController.handle(req, res);
});

categoryRoutes.get("/", (req, res) => {
  return listCategoriesController.handle(req, res);
});

categoryRoutes.post("/import", upload.single("file"), (req, res) => {
  return importCategoriesController.handle(req, res);
});

export { categoryRoutes };
