import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const sendMail = async (email, subject, text) => {
  try {
  
    // Debug biến môi trường lúc gọi hàm
		console.log("EMAIL_USERNAME:", process.env.EMAIL_USERNAME);
		console.log("EMAIL_PASSWORD is set:", !!process.env.EMAIL_PASSWORD);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
      
    });

    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Error sending email: " + error.message);
  }
};