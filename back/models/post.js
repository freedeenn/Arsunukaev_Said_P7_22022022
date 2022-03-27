"use strict";
const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
	const Post = sequelize.define(
		"Post",
		{
			title: {
				type: DataTypes.STRING(100),
				allowNull: true,
			},
			description: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			imageUrl: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
		},
		{
			sequelize,
			tableName: "posts",
			timestamps: false,
			indexes: [
				{
					name: "PRIMARY",
					unique: true,
					using: "BTREE",
					fields: [{ name: "id" }],
				},
			],
		},
		{}
	);
	Post.associate = function (models) {
		// associations can be defined here
		models.Post.belongsTo(models.User, {
			onDelete: "CASCADE",
			hooks: true,
		});
		models.Post.hasMany(models.Comment);
	};
	return Post;
};
