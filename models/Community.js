module.exports = (sequelize, DataTypes) => {
	const Community = sequelize.define(
		"Community",
		{
			communityName: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			description: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			communityImage: {
				type: DataTypes.STRING,
				validate: { isUrl: true },
			},
		},
		{ underscored: true }
	);

	Community.associate = (models) => {
		Community.hasOne(models.ChatRoom, {
			foreignKey: {
				name: "participantId",
				allowNull: false,
			},
			onDelete: "RESTRICT",
			onUpdate: "RESTRICT",
		});
		Community.hasMany(models.CommunityMember, {
			foreignKey: {
				name: "communityId",
				// allowNull: false,
			},
			onDelete: "RESTRICT",
			onUpdate: "RESTRICT",
		});
		Community.hasMany(models.CommunityTag, {
			foreignKey: {
				name: "communityId",
				allowNull: false,
			},
			onDelete: "RESTRICT",
			onUpdate: "RESTRICT",
		});

		Community.hasMany(models.Thread, {
			foreignKey: {
				name: "communityId",
				// allowNull: false,
			},
			onDelete: "RESTRICT",
			onUpdate: "RESTRICT",
		});
	};

	return Community;
};
