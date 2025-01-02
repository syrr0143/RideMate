import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import userRoute from "./routes/user.routes.js";
import captainRoute from "./routes/captain.routes.js";
import cookieParser from "cookie-parser";
import { corsOptions } from "./config/cors.config.js";
import { errorHandler } from "./utils/errorHandler.utils.js";
import SwaggerDocs from "./utils/Swagger.js";

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("api is running properly");
});

app.use("/api/v1/user", userRoute);
app.use("/api/v1/captain", captainRoute);

SwaggerDocs(app, 3000);

app.all("*", (req, res, next) => {
  const error = new Error("Not Found");
  error.statusCode = 404;
  next(error);
});
app.use(errorHandler);

export default app;
