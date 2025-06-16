import mongoose from "mongoose";
import { DB_URI } from "./enviroments.js";

const connectDB = async () => {
  try {
    const connected = await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(
      `✅ Connected MongoDB: mongodb://${connected.connection.host}:${connected.connection.port}/${connected.connection.name}`
    );
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
