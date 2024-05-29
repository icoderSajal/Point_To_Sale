import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.DB_CONNECTION}`
    );
    console.log(
      `\n MongoDB connected to  ${process.env.MODE} !! DB HOST: ${connectionInstance.connection.host}`
        .bgGreen.red.italic.bold
    );
  } catch (error) {
    console.log("MONGODB connection FAILED ", error);
    process.exit(1);
  }
};

export default connectDB;
