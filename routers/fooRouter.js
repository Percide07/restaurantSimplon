import { addFood, getCategories } from "../controllers/fooController.js";
import validationRepas from "../middlewares/validationRepas.js";
import express from "express";

const repasRouter = express.Router();

repasRouter.get("/", getCategories);

repasRouter.post(
  "/",
);

export { repasRouter };
