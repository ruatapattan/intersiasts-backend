module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		"User",
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			username: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: { isEmail: true },
			},
			userType: {
				type: DataTypes.ENUM("user", "admin"),
				defaultValue: "user",
				allowNull: false,
			},
			profilePic: {
				type: DataTypes.STRING,
				validate: { isUrl: true },
			},
			birthDate: {
				type: DataTypes.DATEONLY,
				allowNull: false,
			},
		},
		{ underscored: true }
	);

	User.associate = (models) => {
		User.hasMany(models.ThreadReply, {
			foreignKey: {
				name: "replierId",
				// allowNull: false,
			},
			onDelete: "RESTRICT",
			onUpdate: "RESTRICT",
		});
		User.hasMany(models.ReplyReply, {
			foreignKey: {
				name: "replierId",
				// allowNull: false,
			},
			onDelete: "RESTRICT",
			onUpdate: "RESTRICT",
		});
		User.hasMany(models.ChatLog, {
			foreignKey: {
				name: "senderId",
				// allowNull: false,
			},
			onDelete: "RESTRICT",
			onUpdate: "RESTRICT",
		});
		User.hasMany(models.ChatRoom, {
			foreignKey: {
				name: "participantId",
				// allowNull: false,
			},
			onDelete: "RESTRICT",
			onUpdate: "RESTRICT",
		});
		User.hasMany(models.CommunityMember, {
			foreignKey: {
				name: "userId",
				// allowNull: false,
			},
			onDelete: "RESTRICT",
			onUpdate: "RESTRICT",
		});
		// User.belongsToMany(models.Community, {
		// 	through: "CommunityMember",
		// 	foreignKey: "userId",
		// 	otherKey: "userId",
		// });
		User.hasMany(models.Thread, {
			foreignKey: {
				name: "posterId",
				// allowNull: false,
			},
			onDelete: "RESTRICT",
			onUpdate: "RESTRICT",
		});
		User.hasMany(models.ThreadLike, {
			foreignKey: {
				name: "likerId",
				// allowNull: false,
			},
			onDelete: "RESTRICT",
			onUpdate: "RESTRICT",
		});
	};

	return User;
};
