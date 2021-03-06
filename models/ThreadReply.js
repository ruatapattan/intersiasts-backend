module.exports = (sequelize, DataTypes) => {
	const ThreadReply = sequelize.define(
		"ThreadReply",
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			content: {
				type: DataTypes.STRING(5000),
				allowNull: false,
			},
		},
		{ underscored: true }
	);

	ThreadReply.associate = (models) => {
		ThreadReply.belongsTo(models.Thread, {
			foreignKey: {
				name: "threadId",
				allowNull: false,
			},
			onDelete: "RESTRICT",
			onUpdate: "RESTRICT",
		});
		ThreadReply.hasMany(models.ThreadLike, {
			foreignKey: {
				name: "threadReplyId",
				// allowNull: false,
			},
			onDelete: "RESTRICT",
			onUpdate: "RESTRICT",
		});
		ThreadReply.hasMany(models.ReplyReply, {
			foreignKey: {
				name: "threadReplyId",
				// allowNull: false,
			},
			onDelete: "RESTRICT",
			onUpdate: "RESTRICT",
		});
		ThreadReply.belongsTo(models.User, {
			foreignKey: {
				name: "replierId",
				allowNull: false,
			},
			onDelete: "RESTRICT",
			onUpdate: "RESTRICT",
		});
	};

	return ThreadReply;
};
