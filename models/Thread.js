module.exports = (sequelize, DataTypes) => {
	const Thread = sequelize.define(
		"Thread",
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			title: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			content: {
				type: DataTypes.STRING(5000),
				allowNull: false,
			},
			// likeCount: {
			// 	type: DataTypes.INTEGER,
			// 	allowNull: false,
			// 	defaultValue: 0,
			// },
		},
		{ underscored: true }
	);
	Thread.associate = (models) => {
		Thread.belongsTo(models.User, {
			foreignKey: {
				name: "posterId",
				// allowNull: false,
			},
			onDelete: "RESTRICT",
			onUpdate: "RESTRICT",
		});
		Thread.belongsTo(models.Community, {
			foreignKey: {
				name: "communityId",
				// allowNull: false,
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
		Thread.hasMany(models.Image, {
			foreignKey: {
				name: "threadId",
				// allowNull: false,
			},
			onDelete: "RESTRICT",
			onUpdate: "RESTRICT",
		});
	};

	return Thread;
};
