module.exports = (sequelize, DataTypes) => {
	const ChatLog = sequelize.define(
		"ChatLog",
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
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
		ChatLog.hasMany(models.Image, {
			foreignKey: {
				name: "chatLogId",
				// allowNull: false,
			},
			onDelete: "RESTRICT",
			onUpdate: "RESTRICT",
		});
	};

	return ChatLog;
};
