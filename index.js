import express from "express";
import routes from "./src/routes/index.js";
import connectDB from "./src/configs/db.js";
import notFoundHandler from "./src/middlewares/notFoundHandler.js";
import errorHandler from "./src/middlewares/errorHandler.js";
import cors from "cors";
import { PORT } from "./src/configs/enviroments.js";
import jsonValid from "./src/middlewares/jsonInvalid.js";
import setupSwagger from "./src/configs/swaggerConfig.js";
import { formatResponseSuccess } from "./src/middlewares/successHandler.js";

const app = express();
app.use(express.json());

connectDB();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);

setupSwagger(app);
app.use(formatResponseSuccess);
app.use(jsonValid);
app.use("/api", routes);
app.use(notFoundHandler);
app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(`🚀 Server is running on: http://localhost:${PORT}/api`);
  console.log(`📘 Swagger Docs: http://localhost:${PORT}/api-docs`);
});

process.on("unhandledRejection", (error, promise) => {
  console.error(`Unhandled Rejection: ${error.message}`);
  server.close(() => process.exit(1));
});
