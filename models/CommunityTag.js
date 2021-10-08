module.exports = (sequelize, DataTypes) => {
	const CommunityTag = sequelize.define(
		"CommunityTag",
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
		},
		{ underscored: true }
	);

	CommunityTag.associate = (models) => {
		CommunityTag.belongsTo(models.Community, {
			foreignKey: {
				name: "communityId",
				allowNull: false,
			},
			onDelete: "RESTRICT",
			onUpdate: "RESTRICT",
		});
		CommunityTag.belongsTo(models.Tag, {
			foreignKey: {
				name: "tagId",
				allowNull: false,
			},
			onDelete: "RESTRICT",
			onUpdate: "RESTRICT",
		});
	};

	return CommunityTag;
};
