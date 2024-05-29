import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";
import productRoute from "./routes/product.Routes.js";
import categoryRoute from "./routes/category.Routes.js";
import cors from "cors";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/product", productRoute);
app.use("/api/v1/category", categoryRoute);

const PORT = process.env.PORT;
const MODE = process.env.MODE;
app.listen(PORT, (req, res) => {
  console.log(
    `${MODE} Application is running on Port Numbers ${PORT}`.bgMagenta.white
      .bold
  );
});
