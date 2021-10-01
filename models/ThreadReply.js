module.exports = (sequelize, DataTypes) => {
	const ThreadReply = sequelize.define(
		"ThreadReply",
		{
			content: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			likeCount: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0,
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
