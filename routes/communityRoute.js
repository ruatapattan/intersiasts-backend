const passport = require("passport");
const router = require("express").Router();
const { createThread, getAllThreadsByCommunity } = require("../controllers/threadController");
const { upload } = require("../controllers/uploadController");

//create thread
router.post(
	"/:id/createThread/",
	passport.authenticate("jwt", { session: false }),
	upload.single("cloudinput"),
	createThread
);

//get threads on rendering community page
router.get("/:id", passport.authenticate("jwt", { session: false }), getAllThreadsByCommunity);

module.exports = router;
