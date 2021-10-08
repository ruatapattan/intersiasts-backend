const passport = require("passport");
const router = require("express").Router();
const { createThread, getThreadsByThreadId } = require("../controllers/threadController");
const { upload } = require("../controllers/uploadController");

//get 1 thread commuId is from req.body not here
// router.get("/:threadId", passport.authenticate("jwt", { session: false }), getThreadsByThreadId);
router.get("/:threadId", passport.authenticate("jwt", { session: false }), getThreadsByThreadId);

router.post(
	"/community/:id/create",
	passport.authenticate("jwt", { session: false }),
	upload.single("cloudinput"),
	createThread
);

// router.post("/thread/:threadId/comment", );

module.exports = router;

// /community/thread/comm
