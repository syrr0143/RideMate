import http from "http";
import app from "./app.js";
import dotenv from "dotenv";
import connectDb from "./config/db.config.js";
import { initializeSocket } from "./socket.js";
dotenv.config();
connectDb();

const port = process.env.PORT || 3000;

const server = http.createServer(app);
initializeSocket(server);

server.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
