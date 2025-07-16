import mongoose from "mongoose";
import { configDotenv } from "dotenv";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("Connected to database successfully.")
    );
    await mongoose.connect(`${process.env.MONGODB_URI}/DB_NAME`);
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDB;
