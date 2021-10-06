const router = require("express").Router();
// const authController = require("../controllers/authController");
const passport = require("passport");
const { upload, createCommunity } = require("../controllers/uploadController");

// router.post("/login", authController.loginUser);
// upload.single(fieldName); => in formdata that you'll send here, name it cloudinput
router.post("/", passport.authenticate("jwt", { session: false }), upload.single("cloudinput"), createCommunity);

module.exports = router;
