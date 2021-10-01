module.exports = (sequelize, DataTypes) => {
	const ChatRoom = sequelize.define(
		"ChatRoom",
		{
			roomName: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{ underscored: true }
	);

	ChatRoom.associate = (models) => {
		ChatRoom.hasMany(models.ChatLog, {
			foreignKey: {
				name: "roomId",
				allowNull: false,
			},
			onDelete: "RESTRICT",
			onUpdate: "RESTRICT",
		});
		ChatLog.belongsToMany(models.ChatRoom, {
			foreignKey: {
				name: "participantId",
				allowNull: false,
			},
			onDelete: "RESTRICT",
			onUpdate: "RESTRICT",
		});
	};

	return;
};
