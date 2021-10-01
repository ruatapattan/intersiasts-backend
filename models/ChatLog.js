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
		// Account.belongsTo(models.Customer, {
		// 	foreignKey: {
		// 		name: "customerId",
		// 		allowNull: false,
		// 	},
		// 	onDelete: "RESTRICT",
		// 	onUpdate: "RESTRICT",
		// });

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
	};

	return ChatLog;
};
