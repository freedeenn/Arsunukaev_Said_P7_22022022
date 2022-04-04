const sequelize = require("../config/sequelize");
const db = require("../models/index");
const models = require("../models");
const User = models.users;
const Post = models.posts;
const Comment = models.comments;
const fs = require("fs");
const jwt = require("jsonwebtoken");

/// CREER LE POST ///
exports.createPost = (req, res, next) => {
	const imageUrl = req.file
		? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
		: null;

	db.Post.create({
		UserId: req.auth.userId,
		title: req.body.title,
		description: req.body.description,
		imageUrl: imageUrl,
	})
		.then((post) => res.status(201).json({ ...post, message: "Post créé !" }))
		.catch((error) => res.status(400).json({ error }));
};

/// AFFICHER TOUTES LES POSTS //
exports.getAllPosts = (req, res, next) => {
	// db.Post.findAll({ include: [db.User, db.Comment]  })
	db.Post.findAll({
		include: [db.User, { model: db.Comment, include: db.User }],
	})
		.then((posts) => res.status(200).json(posts))
		.catch((error) => res.status(400).json({ error }));
};

/// AFFICHER UN POST //
exports.getOnePost = (req, res, next) => {
	db.Post.findOne({
		_id: req.params.id,
		include: [db.User, { model: db.Comment, include: db.User }],
	}) // retrouver un élément par son id
		.then((post) => res.status(200).json(post))
		.catch((error) => res.status(404).json({ error }));
};

/// SUPPRIMER UN POST //
exports.deletePost = (req, res) => {
	db.Post.findOne({
		where: { id: req.params.id },
		include: [db.User, { model: db.Comment, include: db.User }],
	}).then((post) => {
		console.log("---------");
		console.log(req.auth);
		console.log("---------");
		if (post.UserId === req.auth.UserId || post.User.isAdmin === true) {
			post
				.destroy({ where: { id: req.params.id } })
				.then(() =>
					res.status(200).json({ message: `Post supprimé !${req.params.id}` })
				);
		} else {
			res.status(401).json({ message: "Impossible de supprimer le post" });
		}
	});
};
