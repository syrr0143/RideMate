const cors = require("cors");
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.end("hello");
});

module.exports = app;
