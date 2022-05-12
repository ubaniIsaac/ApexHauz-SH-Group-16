require("dotenv").config(); // Load .env file into process

const express = require("express");
const db = require("./src/config/db.config.js");
const cors = require("cors");
const user = require("./src/routes/user.route.js");


const app = express();


app.use(cors());
app.use(express.json());
app.use("/", user);