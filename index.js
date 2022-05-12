require("dotenv").config(); // Load .env file into process

const express = require("express");
const db = require("./src/config/db.config.js");
const cors = require("cors");
const user = require("./src/routes/user.route.js");


const app = express();

const PORT = process.env.PORT || 5000;



app.use(cors());
app.use(express.json());
app.use("/", user);

app.get("/", (req, res) => {
    res.json({ message: 'ApexHauz Api' })
});

require("./src/routes/property.route")(app);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
})