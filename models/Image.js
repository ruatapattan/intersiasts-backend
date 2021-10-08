module.exports = (sequelize, DataTypes) => {
	const Image = sequelize.define(
		"Image",
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			imageUrl: {
				type: DataTypes.JSON,
			},
		},
		{ underscored: true }
	);

	Image.associate = (models) => {
		Image.belongsTo(models.Thread, {
			foreignKey: {
				name: "threadId",
				// allowNull: false,
			},
			onDelete: "RESTRICT",
			onUpdate: "RESTRICT",
		});
		Image.belongsTo(models.ChatLog, {
			foreignKey: {
				name: "chatLogId",
				// allowNull: false,
			},
			onDelete: "RESTRICT",
			onUpdate: "RESTRICT",
		});
	};

	return Image;
};
