import mongoose from "mongoose";

async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("connected to mongodb");
  } catch (error) {
    console.error("error connecting to mongodb", error);
    process.exit(1);
  }
}

export default connectDb;
