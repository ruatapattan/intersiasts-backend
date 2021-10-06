module.exports = (sequelize, DataTypes) => {
	const ChatLog = sequelize.define(
		"ChatLog",
		{
			message: {
				type: DataTypes.STRING,
			},
		},
		{ underscored: true }
	);

	ChatLog.associate = (models) => {
		ChatLog.belongsTo(models.ChatRoom, {
			foreignKey: {
				name: "roomId",
				allowNull: false,
			},
			onDelete: "RESTRICT",
			onUpdate: "RESTRICT",
		});
		ChatLog.belongsTo(models.User, {
			foreignKey: {
				name: "senderId",
				allowNull: false,
			},
			onDelete: "RESTRICT",
			onUpdate: "RESTRICT",
		});
		ChatLog.belongsToMany(models.Image, { through: "chat_image" });
	};

	return ChatLog;
};
