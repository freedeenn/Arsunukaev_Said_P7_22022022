const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
	const Comment = sequelize.define(
		"Comment",
		{
			comment: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			// createdAt: {
			// 	type: DataTypes.NOW,
			// 	allowNull: true,
			// },
		},
		{
			sequelize,
			tableName: "comments",
			timestamps: true,
			indexes: [
				{
					name: "PRIMARY",
					unique: true,
					using: "BTREE",
					fields: [{ name: "id" }],
				},
				{
					name: "userId",
					using: "BTREE",
					fields: [{ name: "UserId" }],
				},
				{
					name: "postId",
					using: "BTREE",
					fields: [{ name: "PostId" }],
				},
			],
		}
	);
	Comment.associate = function (models) {
		// associations can be defined here
		models.Comment.belongsTo(models.User, {
			onDelete: "CASCADE",
			hooks: true,
		});
		models.Comment.belongsTo(models.Post, {
			onDelete: "CASCADE",
			hooks: true,
		});
	};
	return Comment;
};
