import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGODB_URL);
    console.log("connected to db");
  } catch (err) {
    console.log(err);
  }
};
