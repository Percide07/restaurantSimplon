import express from "express";
import { PrismaClient } from "@prisma/client";
import { homeRouter } from "./routers/homeRouter.js";
import { contactRouter } from "./routers/contactRouter.js";
import { aboutRouter } from "./routers/aboutRouter.js";
import { repasRouter } from "./routers/fooRouter.js";
import { logData } from "./middlewares/logs.js";

const prisma = new PrismaClient();

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static("public"));

app.use(logData);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/home", homeRouter);
app.use("/contact", contactRouter);
app.use("/about", aboutRouter);
app.use("/ajouterRepas", repasRouter);

app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message });
  console.log(error.stack);
});

app.listen(PORT, () => {
  console.log(`Serveur en activité sur le port ${PORT}...`);
});
