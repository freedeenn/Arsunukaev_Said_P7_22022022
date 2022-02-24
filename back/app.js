const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
	"foodly",
	"root",
	"votresupermotdepassetrescomplique",
	{
		host: "localhost",
		dialect: "mysql",
	}
);

async function test() {
	try {
		await sequelize.authenticate();
		console.log("Connection has been established successfully.");
		await User.sync({ force: true });
		await User.create({ firstName: "Jane", lastName: "Doe" });
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
}
test();

const User = sequelize.define(
	"User",
	{
		// Model attributes are defined here
		firstName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		lastName: {
			type: DataTypes.STRING,
			// allowNull defaults to true
		},
	},
	{
		// Other model options go here
	}
);
