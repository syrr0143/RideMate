  import mongoose from "mongoose";

async function connectDb() {
     if (!process.env.MONGODB_URI) {
       console.error(
         "MONGODB_URI is not defined in the environment variables."
       );
       process.exit(1);
     }
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log("connected to mongodb");
      return;
    } catch (error) {
      console.error("error connecting to mongodb", error);
      process.exit(1);
    }
  }

  export default connectDb;
