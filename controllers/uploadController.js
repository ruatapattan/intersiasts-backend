const { Community, CommunityTag, Tag } = require("../models");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const util = require("util");
const uploadPromise = util.promisify(cloudinary.uploader.upload);
const { Op } = require("sequelize");

exports.upload = multer({
	storage: multer.diskStorage({
		destination: (req, file, cb) => {
			console.log(file); //{fieldname,originalname,encoding,mimetype}
			cb(null, "public/images");
		},
		filename: (res, file, cb) => {
			cb(null, new Date().getTime() + "." + file.mimetype.split("/")[1]);
		},
	}),

	fileFilter: (req, file, cb) => {
		if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
			cb(null, true);
		} else {
			cb(null, false);
			return cd(new Error("Only .png, .jpg and .jpeg format allowed."));
		}
	},
});

exports.createCommunity = async (req, res, next) => {
	try {
		console.log("req.file: ", req.file);
		const { communityName, tag, description } = req.body;

		const result = await uploadPromise(req.file.path);
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

		// res.send({ success: true });
		res.send({ success: true, community });
		// res.send({ success: true, tagResult });
	} catch (err) {
		next(err);
	}
};

// const [createInput, setCreateInput] = useState({
//     name: "",
//     tags: [
//         /*indoor,gaming,TH*/
//     ],
//     image: null,
//     content: "",
// });
