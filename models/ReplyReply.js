module.exports = (sequelize, DataTypes) => {
	const ReplyReply = sequelize.define(
		"ReplyReply",
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			content: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{ underscored: true }
	);

	ReplyReply.associate = (models) => {
		ReplyReply.belongsTo(models.ThreadReply, {
			foreignKey: {
				name: "threadReplyId",
				allowNull: false,
			},
			onDelete: "RESTRICT",
			onUpdate: "RESTRICT",
		});
		ReplyReply.hasMany(models.ThreadLike, {
			foreignKey: {
				name: "replyReplyId",
				// allowNull: false,
			},
			onDelete: "RESTRICT",
			onUpdate: "RESTRICT",
		});
		ReplyReply.belongsTo(models.User, {
			foreignKey: {
				name: "replierId",
				allowNull: false,
			},
			onDelete: "RESTRICT",
			onUpdate: "RESTRICT",
		});
	};

	return ReplyReply;
};
