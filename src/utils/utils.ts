import crypto from "crypto";
import nodemailer from "nodemailer";
import { resetPassMailOptions } from "../mails/reset-pass";

// Generate a random token
export const generateToken = () => crypto.randomBytes(32).toString("hex");

// Send reset email using nodemailer
export const sendEmail = async (email: string, token: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const resetURL = `https://sazzad-karim.netlify.app/reset-password?token=${token}`;

  const mailOptions = resetPassMailOptions(email, resetURL);

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
};
