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
const { upload } = require("./uploadController");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const util = require("util");
const { Sequelize } = require("sequelize");
const uploadPromise = util.promisify(cloudinary.uploader.upload);

//get threads only to show at community page
//not literally every single thing
exports.getAllThreadsByCommunity = async (req, res, next) => {
	try {
		const threadsResult = await Community.findOne({
			where: { id: req.params.id },

			include: [
				{
					model: Thread,
					include: [
						{
							model: User,
							attributes: ["username"],
						},
						{
							model: ThreadLike,
							attributes: ["id"],
						},
						{
							model: ThreadReply,
							attributes: ["id"],
						},
					],
				},
				{
					model: CommunityTag,
					// where: { communityId: req.params.id },
					include: [
						{
							model: Tag,
						},
					],
				},
				{
					model: CommunityMember,
					attributes: ["memberRole"],
					include: {
						model: User,
					},
				},
			],
		});

		res.send({
			community: {
				id: threadsResult.id,
				name: threadsResult.communityName,
				image: threadsResult.communityImage,
				description: threadsResult.description,
			},
			threads: threadsResult.Threads,
			tags: threadsResult.CommunityTags.map((item) => item.Tag),

			communityMembers: threadsResult.CommunityMembers.map((item) => ({
				memberRole: item.memberRole,
				memberId: item.User.id,
				username: item.User.username,
				profilePic: item.User.profilePic,
			})),
		});
	} catch (err) {
		next(err);
	}
};

exports.getThreadsByThreadId = async (req, res, next) => {
	console.log(req.params.threadId);
	try {
		const thread = await Thread.findOne({
			where: { id: req.params.threadId },
			include: [
				{
					model: Community,
					include: [
						{
							model: CommunityMember,
							attributes: ["memberRole"],
							include: {
								model: User,
							},
						},
					],
				},
				{
					model: User,
				},
				{ model: ThreadLike },

				{
					model: ThreadReply,
					include: [
						{ model: ThreadLike },
						{
							model: ReplyReply,
							order: [["updatedAt", "DESC"]],
							include: [{ model: ThreadLike }],
						},
					],
				},
			],
			// order: [["id"]],
		});

		res.send({
			all: thread,
			thread: {
				id: thread.id,
				title: thread.title,
				content: thread.content,
				createdAt: thread.createdAt,
				updatedAt: thread.updatedAt,
			},
			community: {
				id: thread.Community.id,
				name: thread.Community.communityName,
				description: thread.Community.description,
				image: thread.Community.communityImage,
			},
			poster: {
				id: thread.User.id,
				username: thread.User.username,
				profilePic: thread.User.profilePic,
			},
			threadLikes: thread.ThreadLikes,
			threadReplies: thread.ThreadReplies,
			communityMembers: thread.Community.CommunityMembers.map((item) => ({
				memberRole: item.memberRole,
				memberId: item.User.id,
				username: item.User.username,
				profilePic: item.User.profilePic,
			})),
			// threadReplies: thread.ThreadReplies.map((item) => ({
			// 	replyId: item.id,
			// 	replyContent: item.content,
			// 	createdAt: item.createdAt,
			// 	updatedAt: item.updatedAt,
			// 	replyLikes: item.replyLikes,
			// 	replyreplies: item.ReplyReplies.map(item=> (

			// 	))
			// })),
		});
	} catch (err) {
		next(err);
	}
};

exports.createThread = async (req, res, next) => {
	try {
		console.log("req.file is: ", req.file);

		const { title, content, posterId } = req.body;
		// console.log("request body: ", req.body);
		// console.log("hi");

		const thread = await Thread.create({
			title,
			content,
			communityId: req.params.id,
			posterId,
		});

		if (req.file) {
			console.log("found img");
			const uploaded = await uploadPromise(req.file.path, { timeout: 60000 });
			const storedImage = await Image.create({
				imageUrl: { secure_url: uploaded.secure_url, public_id: uploaded.public_id },
				threadId: thread.id,
			});
			fs.unlinkSync(req.file.path);
		}

		console.log(thread.id);
		console.log("overall done");

		res.send({ thread });
	} catch (err) {
		next(err);
	}
};
