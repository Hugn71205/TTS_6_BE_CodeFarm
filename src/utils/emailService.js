import nodemailer from 'nodemailer';
import dotenv from "dotenv";
 dotenv.config();

 import templateMail from './templateMail.js';


const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 465,
  secure: true, // port 465 thì secure=true
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function sendMail({ email, template, type }) {
  try {
    const info = await transporter.sendMail({
      from: 'shop nuoc hoa <no-reply@nuochoa.com>',
      to: email,
      subject: template?.subject,
      html: templateMail(type, template),
      replyTo: undefined,
    });
    console.log('message sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending mail:', error);
  }
}
