module.exports = (sequelize, DataTypes) => {
	const Tag = sequelize.define(
		"Tag",
		{
			tagName: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
		},
		{ underscored: true }
	);

	Tag.associate = (models) => {
		Tag.hasMany(models.CommunityTag, {
			foreignKey: {
				name: "tagId",
				allowNull: false,
			},
			onDelete: "RESTRICT",
			onUpdate: "RESTRICT",
		});
	};

	return Tag;
};
