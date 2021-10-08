module.exports = (sequelize, DataTypes) => {
	const CommunityMember = sequelize.define(
		"CommunityMember",

		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			memberRole: {
				type: DataTypes.ENUM("member", "owner", "moderator"),
				allowNull: false,
			},
		},
		{ underscored: true }
	);

	CommunityMember.associate = (models) => {
		CommunityMember.belongsTo(models.Community, {
			foreignKey: {
				name: "communityId",
				allowNull: false,
			},
			onDelete: "RESTRICT",
			onUpdate: "RESTRICT",
		});
		CommunityMember.belongsTo(models.User, {
			foreignKey: {
				name: "userId",
				allowNull: false,
			},
			onDelete: "RESTRICT",
			onUpdate: "RESTRICT",
		});
	};
	return CommunityMember;
};
