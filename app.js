require("dotenv").config();
const cors = require("cors");
const express = require("express");
// const multer = require("multer");
const { sequelize } = require("./models");
// const cloudinary = require("cloudinary").v2;
// const fs = require("fs");
// const util = require("util");
const authRoute = require("./routes/authRoute");
const createCommunityRoute = require("./routes/createCommunityRoute");
const errorController = require("./controllers/errorController");

// sequelize.sync({ alter: true });

const passport = require("passport");
require("./config/passport");

// const uploadPromise = util.promisify(cloudinary.uploader.upload);

const app = express();

app.use(passport.initialize());

app.use(cors()); //cross domain sharing

app.use(express.json()); //allows body

app.use("/public", express.static("public"));

//multer

// const upload = multer({
// 	storage: multer.diskStorage({
// 		destination: (req, file, cb) => {
// 			console.log(file); //{fieldname,originalname,encoding,mimetype}
// 			cb(null, "public/images");
// 		},
// 		filename: (res, file, cb) => {
// 			cb(null, new Date().getTime() + "." + file.mimetype.split("/")[1]);
// 		},
// 	}),

// 	fileFilter: (req, file, cb) => {
// 		if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
// 			cb(null, true);
// 		} else {
// 			cb(null, false);
// 			return cd(new Error("Only .png, .jpg and .jpeg format allowed."));
// 		}
// 	},
// });

app.use("/createCommunity", createCommunityRoute);
app.use("/", authRoute);

app.use((req, res, next) => {
	// console.log(err);
	res.status(404).send({ message: "resource not found on this server" });
});

app.use(errorController);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`server is running on port ${port}`));
