import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

const prisma = new PrismaClient();
dotenv.config();

const user_email = process.env.EMAIL_USERNAME;
const user_password = process.env.EMAIL_PASSWORD;

const sendEmail = async (req, res, next) => {
  try {
    const email = req.body.email;

    // Check if the email already exists in the database
    const existEmail = await prisma.newsletters.findUnique({
      where: {
        email,
      },
    });

    if (existEmail) {
      return res.json({ message: "Email already exists" });
    }

    // Create a nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 465,
      secure: true, // Use true for port 465, false for all other ports
      auth: {
        user: user_email,
        pass: user_password,
      },
    });

    // Define the email options
    const mailOptions = {
      from: user_email,
      to: email,
      subject: "Newsletter  | Simplon Restaurant App",
      text: "You are subscribed to receive the restaurant information. Thanks for subscribing",
      html: `<p>Your subscription is validated</p>
              <p>Thank you for subscribing</p>`,
    };

    // Send the email
    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        console.error(error);
        return res.json({ error: "Error sending email" });
      } else {
        const savedEmail = await prisma.newsletters.create({
          data: {
            id_newsletter: uuidv4(),
            email,
          },
        });
        return res.redirect("/home");
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export { sendEmail };
