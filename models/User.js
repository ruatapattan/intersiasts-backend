module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		"User",
		{
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
				allowNull: false,
			},
		},
		{ underscored: true }
	);

	User.associate = (models) => {
		User.hasMany(models.ThreadReply, {
			foreignKey: {
				name: "userId",
				// allowNull: false,
			},
			onDelete: "RESTRICT",
			onUpdate: "RESTRICT",
		});
		User.hasMany(models.ChatLog, {
			foreignKey: {
				name: "userId",
				// allowNull: false,
			},
			onDelete: "RESTRICT",
			onUpdate: "RESTRICT",
		});
		User.hasMany(models.ChatRoom, {
			foreignKey: {
				name: "userId",
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
		User.belongsToMany(models.Community, {
			through: "CommunityMember",
			foreignKey: "userId",
			otherKey: "userId",
		});
		User.hasMany(models.ThreadReply, {
			foreignKey: {
				name: "userId",
				// allowNull: false,
			},
			onDelete: "RESTRICT",
			onUpdate: "RESTRICT",
		});
		User.hasMany(models.Thread, {
			foreignKey: {
				name: "userId",
				// allowNull: false,
			},
			onDelete: "RESTRICT",
			onUpdate: "RESTRICT",
		});
	};

	return User;
};
