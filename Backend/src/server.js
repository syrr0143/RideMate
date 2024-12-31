import http from "http";
import app from "./app.js";

import connectDb from "./config/db.config.js";
import { initializeSocket } from "./socket.js";

connectDb();

const port = process.env.PORT || 3000;

const server = http.createServer(app);
initializeSocket(server);

server.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
