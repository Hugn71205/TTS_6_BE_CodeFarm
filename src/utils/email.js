import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const sendEmail = async (email, subject, text) => {
	try {
		const EMAIL_USERNAME = process.env.EMAIL_USERNAME;
		const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

		// Debug biến môi trường lúc gọi hàm
		console.log("EMAIL_USERNAME:", EMAIL_USERNAME);
		console.log("EMAIL_PASSWORD is set:", !!EMAIL_PASSWORD);

		if (!EMAIL_USERNAME || !EMAIL_PASSWORD) {
			throw new Error("Email credentials are not set in environment variables");
		}

		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: EMAIL_USERNAME,
				pass: EMAIL_PASSWORD,
			},
		});

		const mailOptions = {
			from: EMAIL_USERNAME,
			to: email,
			subject,
			text,
		};

		await transporter.sendMail(mailOptions);
	} catch (error) {
		console.error("Failed to send email:", error);
		throw new Error("Error sending email: " + error.message);
	}
};
