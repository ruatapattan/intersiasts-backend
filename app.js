require("dotenv").config();

const cors = require("cors");
const express = require("express");

const app = express();

app.use(cors()); //cross domain sharing

app.use(express.json()); //allows body

const port = process.env.PORT || 8000;

console.log(port);

app.listen(port, () => console.log(`server is running on port ${port}`));
