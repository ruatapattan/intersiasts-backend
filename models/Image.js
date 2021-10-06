module.exports = (sequelize, DataTypes) => {
	const Image = sequelize.define(
		"Image",
		{
			imageUrl: {
				type: DataTypes.STRING,
				validate: { isUrl: true },
			},
		},
		{ underscored: true }
	);

	Image.associate = (models) => {
		Image.belongsToMany(models.Thread, { through: "thread_image", underscored: true });
		Image.belongsToMany(models.ChatLog, { through: "chat_image", underscored: true });
	};

	return Image;
};
