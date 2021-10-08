const { Community, CommunityTag, Tag, CommunityMember } = require("../models");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const util = require("util");
const uploadPromise = util.promisify(cloudinary.uploader.upload);
const { Op } = require("sequelize");

exports.getAllTags = async (req, res, next) => {
	try {
		const tags = await Tag.findAll({ attributes: ["id", "tagName"] });
		// console.log(JSON.stringify(tags, null, 2));
		res.send({ tags });
	} catch (err) {
		next(err);
	}
};

exports.createCommunity = async (req, res, next) => {
	try {
		console.log("req.file: ", req.file);
		const { communityName, tag, description, userId } = req.body;

		const result = await uploadPromise(req.file.path, { timeout: 60000 });
		// console.log(result);
		const community = await Community.create({
			communityName,
			description,
			communityImage: { secure_url: result.secure_url, public_id: result.public_id },
		});
		fs.unlinkSync(req.file.path);

		const tagResult = await Tag.findAll({
			where: {
				[Op.or]: [{ tagName: tag }],
			},
			attributes: ["id"],
		});

		console.log("community from above: ", community);

		// console.log("tagres to use: ", JSON.stringify(tagResult, null, 2));

		const tagIdToAdd = tagResult.map((item) => ({ tagId: item.id, communityId: community.id }));
		// // console.log("tagres to use: ", tagResult);
		// console.log("tag id to add", tagIdToAdd);

		// const communityTagResult = await CommunityTag.bulkCreate({communityId: community.result.id, tagId:  })
		const communityTagResult = await CommunityTag.bulkCreate(tagIdToAdd);

		await CommunityMember.create({
			memberRole: "owner",
			communityId: community.id,
			userId,
		});

		// res.send({ success: true });
		res.send({ community });
		// res.send({ success: true, tagResult });
	} catch (err) {
		next(err);
	}
};
