module.exports = (sequelize, DataTypes) => {
	const Thread = sequelize.define("Thread", {
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		content: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		likeCount: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0,
		},
	});
	Thread.associate = (models) => {
		Thread.belongsTo(models.User, {
			foreignKey: {
				name: "posterId",
				allowNull: false,
			},
			onDelete: "RESTRICT",
			onUpdate: "RESTRICT",
		});
		Thread.belongsTo(models.Community, {
			foreignKey: {
				name: "communityId",
				allowNull: false,
			},
			onDelete: "RESTRICT",
			onUpdate: "RESTRICT",
		});
		Thread.hasMany(models.ThreadReply, {
			foreignKey: {
				name: "threadId",
				// allowNull: false,
			},
			onDelete: "RESTRICT",
			onUpdate: "RESTRICT",
		});
		Thread.hasMany(models.ThreadLike, {
			foreignKey: {
				name: "threadId",
				// allowNull: false,
			},
			onDelete: "RESTRICT",
			onUpdate: "RESTRICT",
		});
		Thread.belongsToMany(models.Image, { through: "thread_image" });
	};

	return Thread;
};
