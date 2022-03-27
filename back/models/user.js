"use strict";
const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
	const User = sequelize.define(
		"User",
		{
			firstName: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
			lastName: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING(255),
				allowNull: false,
				unique: "email",
			},
			password: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
			isAdmin: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				default: false,
			},
		},
		{
			sequelize,
			tableName: "users",
			timestamps: false,
			indexes: [
				{
					name: "PRIMARY",
					unique: true,
					using: "BTREE",
					fields: [{ name: "id" }],
				},
				{
					name: "email",
					unique: true,
					using: "BTREE",
					fields: [{ name: "email" }],
				},
			],
		},
		{}
	);
	User.associate = function (models) {
		// associations can be defined here
		models.User.hasMany(models.Post);
		models.User.hasMany(models.Comment);
	};

	return User;
};
