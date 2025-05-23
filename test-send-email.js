import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

async function testSend() {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    let info = await transporter.sendMail({
      from: process.env.EMAIL_USERNAME,
      to: "your-email@example.com",
      subject: "Test Nodemailer",
      text: "Hello from Nodemailer test!",
    });

    console.log("Message sent:", info.messageId);
  } catch (error) {
    console.error("Send mail error:", error);
  }
}

testSend();
