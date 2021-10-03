module.exports = (sequelize, DataTypes) => {
	const ThreadLike = sequelize.define(
		"ThreadLike",
		{},

		{ underscored: true }
	);

	ThreadLike.associate = (models) => {
		ThreadLike.belongsTo(models.Thread, {
			foreignKey: {
				name: "threadId",
				allowNull: false,
			},
			onDelete: "RESTRICT",
			onUpdate: "RESTRICT",
		});
	};
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

	return ThreadLike;
};
