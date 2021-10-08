module.exports = (sequelize, DataTypes) => {
	const ChatRoom = sequelize.define(
		"ChatRoom",
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},

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
		ChatRoom.belongsTo(models.User, {
			foreignKey: {
				name: "participantId",
				allowNull: false,
			},
			onDelete: "RESTRICT",
			onUpdate: "RESTRICT",
		});
		ChatRoom.belongsTo(models.Community, {
			foreignKey: {
				name: "participantId",
				allowNull: false,
			},
			onDelete: "RESTRICT",
			onUpdate: "RESTRICT",
		});
	};

	return ChatRoom;
};
