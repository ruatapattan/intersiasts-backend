const {
	Thread,
	Image,
	Community,
	CommunityTag,
	Tag,
	CommunityMember,
	User,
	ThreadLike,
	ThreadReply,
	ReplyReply,
} = require("../models");
const { Sequelize } = require("sequelize");

exports.addReply = async (req, res, next) => {
	try {
		//content, threadId,replierId
		const { content, threadId, replierId } = req.body;

		const addedReply = await ThreadReply.create({
			content,
			threadId,
			replierId,
		});

		res.send({ addedReply });
	} catch (err) {
		next(err);
	}
};
