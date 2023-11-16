import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }
  if (!process.env.MONGO_URL) {
    throw new Error("JWT_KEY must be defined");
  }
  try {
    await mongoose.connect(process.env.MONGO_URL);

    console.log("Connected to MongoDb");
  } catch (error) {
    console.error(error);
  }
  app.listen(3000, () => {
    console.log("Listening on 3000");
  });
};

start();
