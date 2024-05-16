import { homeController } from "../controllers/homeController.js";
import { sendEmail } from "../middlewares/mailer.js";
import express from "express";

const homeRouter = express.Router();

homeRouter.get("/home", homeController);
homeRouter.post("/sendEmail", sendEmail);

export { homeRouter };
