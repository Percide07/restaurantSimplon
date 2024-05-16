import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

const prisma = new PrismaClient();
dotenv.config();

const user_email = process.env.EMAIL_USERNAME;
const user_password = process.env.EMAIL_PASSWORD;

const homeController = async (req, res) => {
  try {
    await renderHome(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const renderHome = async (req, res) => {
  try {
    const repasList = await prisma.repas.findMany({
      include: {
        categorie: true,
      },
    });

    const employeeList = await prisma.employes.findMany();
    const restaurantData = await prisma.restaurants.findFirst();

    res.render("home", {
      repasList,
      employeeList,
      restaurantData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export { homeController };
