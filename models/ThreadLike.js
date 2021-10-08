module.exports = (sequelize, DataTypes) => {
	const ThreadLike = sequelize.define(
		"ThreadLike",
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
		},

		{ underscored: true }
	);

	ThreadLike.associate = (models) => {
		ThreadLike.belongsTo(models.Thread, {
			foreignKey: {
				name: "threadId",
				// allowNull: false,
			},
			onDelete: "RESTRICT",
			onUpdate: "RESTRICT",
		});
	};
	ThreadLike.associate = (models) => {
		ThreadLike.belongsTo(models.ThreadReply, {
			foreignKey: {
				name: "threadReplyId",
				// allowNull: false,
			},
			onDelete: "RESTRICT",
			onUpdate: "RESTRICT",
		});

		ThreadLike.belongsTo(models.ReplyReply, {
			foreignKey: {
				name: "replyReplyId",
				// allowNull: false,
			},
			onDelete: "RESTRICT",
			onUpdate: "RESTRICT",
		});

		ThreadLike.associate = (models) => {
			ThreadLike.belongsTo(models.User, {
				foreignKey: {
					name: "likerId",
					allowNull: false,
				},
				onDelete: "RESTRICT",
				onUpdate: "RESTRICT",
			});
		};
	};

	return ThreadLike;
};
