const passport = require("passport");
const { addReply } = require("../controllers/replyController");
const router = require("./authRoute");

router.post("/create", passport.authenticate("jwt", { session: false }), addReply);

module.exports = router;
