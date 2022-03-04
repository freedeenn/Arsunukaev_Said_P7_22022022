const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		"User",
		{
			id: {
				autoIncrement: true,
				type: DataTypes.SMALLINT.UNSIGNED,
				allowNull: false,
				primaryKey: true,
			},
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
			tableName: "Users",
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
		}
	);
};
