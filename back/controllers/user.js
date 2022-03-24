const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const cryptoJs = require("crypto-js/md5");
const sequelize = require("../config/sequelize");
const db = require("../models/index");

// Création d'un nouvel utilisateur
exports.signup = (req, res) => {
	console.log(req.body);
	if (
		!req.body.firstName ||
		!req.body.lastName ||
		!req.body.email ||
		!req.body.password
	) {
		return res
			.status(400)
			.json({ message: "Merci de remplir tous les champs" });
	}
	db.User.findOne({ where: { email: req.body.email } }).then((user) => {
		if (!user) {
			bcrypt
				.hash(req.body.password, 10)
				.then((hash) => {
					db.User.create({
						email: cryptoJs(req.body.email).toString(),
						password: hash,
						firstName: req.body.firstName,
						lastName: req.body.lastName,
						isAdmin: false,
					})
						.then((user) =>
							res.status(201).json({
								loggedIn: true,
								userInfo: [user.firstName, user.lastName],
								userId: user.id,
								message: "Enregistrement réussie. Connectez-vous.",
							})
						)
						.catch((error) =>
							res.status(409).json({ error: "Cet utilisateur existe déjà" })
						);
				})
				.catch((error) => res.status(500).json({ error: error.message }));
		} else {
			res.status(409).json({ message: "Cet utilisateur existe déjà" });
		}
	});
};

// Connexion à un compte déjà existant
exports.login = (req, res) => {
	db.User.findOne({ where: { email: cryptoJs(req.body.email).toString() } })
		.then((user) => {
			if (!user) {
				return res.status(401).json({ message: "Utilisateur non trouvé !" });
			}
			bcrypt
				.compare(req.body.password, user.password)
				.then((valid) => {
					if (!valid) {
						return res
							.status(401)
							.json({ loggedIn: false, message: "Mot de passe incorrect !" });
					}
					const token = jwt.sign({ userId: user.id }, process.env.TOKEN_KEY, {
						expiresIn: "24h",
					});
					res.status(200).json({
						loggedIn: true,
						userInfo: [user.firstName, user.lastName],
						userId: user.id,
						token,
						role: user.isAdmin,
					});
				})
				.catch((error) => res.status(500).json({ error: error.message }));
		})
		.catch((error) => res.status(500).json({ error: error.message }));
};

exports.getAllUsers = (req, res) => {
	db.User.findAll({ attributes: ["id", "firstName", "lastName"] })
		.then((users) => res.status(200).json(users))
		.catch((error) => res.status(404).json(error));
};

exports.getOneUser = (req, res) => {
	db.User.findOne({ where: { id: req.params.id } })
		.then((user) => res.status(200).json(user))
		.catch((error) => res.status(404).json(error));
};

exports.deleteUser = (req, res) => {
	const token = req.headers.authorization.split(" ")[1];
	const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
	const userId = decodedToken.userId;
	db.User.findOne({ where: { id: req.params.id } })
		.then((user) => {
			if (user.id === userId || user.isAdmin === true) {
				user.destroy({ where: { id: req.params.id } }).then(() => {
					res
						.status(200)
						.json({ message: "Votre compte a bien été supprimé !" })
						.catch((err) =>
							res
								.status(400)
								.json({ message: "Votre compte n'a pas pu étre supprimé !" })
						);
				});
			}
		})
		.catch((error) => res.status(500).json({ error: error.message }));
};
