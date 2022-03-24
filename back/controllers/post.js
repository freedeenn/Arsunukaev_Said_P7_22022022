const models = require("../models");
const sequelize = require("../config/sequelize");
const Post = models.posts;
const User = models.users;
const Comment = models.comments;
const fs = require("fs");
const db = require("../models/index");

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
	db.Post.findAll({ include: db.User })
		.then((posts) => res.status(200).json(posts))
		.catch((error) => res.status(400).json({ error }));
};

/// AFFICHER UN POST //
exports.getOnePost = (req, res, next) => {
	db.Post.findOne({ _id: req.params.id }) // retrouver un élément par son id
		.then((post) => res.status(200).json(post))
		.catch((error) => res.status(404).json({ error }));
};

exports.modifyPost = (req, res, next) => {
	const postObject = req.file
		? {
				...req.body.post,
				imageUrl: `${req.protocol}://${req.get("host")}/images/${
					req.file.filename
				}`,
		  }
		: { ...req.body };

	Post.update(
		{ ...postObject, id: req.params.id },
		{ where: { id: req.params.id } }
	)
		.then(() => res.status(200).json({ message: "Post modifié !" }))
		.catch((error) => res.status(400).json({ error }));
};

/// SUPPRIMER UN POST //
exports.deletePost = (req, res) => {
	// db.Post.hasMany({ foreignKey: "postId" });
	// Comment.belongsTo(Post, {
	// 	foreignKey: "postId",
	// 	onDelete: "CASCADE",
	// 	hooks: true,
	// });
	db.Post.findOne({ where: { id: req.params.id } }).then((post) => {
		if (db.Post.userId === req.body.id || isAdmin === true) {
			db.Post.destroy({ where: { id: req.params.id } })
				.then(() =>
					res.status(200).json({ message: `Post supprimé !${req.params.id}` })
				)

				.catch((err) =>
					res.status(401).json({ message: "Impossible de supprimer le post" })
				);
		}
	});
};

/// MODIFIER UN POST //
exports.modifyPost = (req, res, next) => {
	if (req.file) {
		// si la request concerne le changement du file, donc l'image
		db.Post.findOne({ _id: req.params.id }) //on trouve le post concernée par son id
			.then((post) => {
				// on suppr son image
				const filename = post.imageUrl.split("/images/")[1];
				// on suppr le lien entre l'ancienne image et le post en question
				fs.unlink(`images/${filename}`, () => {
					// on met à jour le reste du <body>
					const postObject = {
						...JSON.parse(req.body.post),
						imageUrl: `${req.protocol}://${req.get("host")}/images/${
							req.file.filename
						}`,
					};
					// on met à jour le post avec la nouvelle image
					db.Post.updateOne(
						{ _id: req.params.id },
						{ ...postObject, _id: req.params.id }
					)
						.then(() =>
							res.status(200).json({ message: "Le post a bien été modifiée !" })
						)
						.catch((error) => res.status(400).json({ error }));
				});
			})
			.catch((error) => res.status(500).json({ error }));
	} else {
		// si la modif n'a pas été portée sur l'image
		const postObject = { ...req.body }; // alors, récupérer le contenu du <body>
		db.Post.updateOne(
			// et mettre à jour le post concernée
			{ _id: req.params.id },
			{ ...postObject, _id: req.params.id }
		)
			.then(() =>
				res.status(200).json({ message: "Le post a bien été modifiée !" })
			)
			.catch((error) => res.status(400).json({ error }));
	}
};

/// LIKE OU DISLIKE UN POST //
// Like et dislikes
exports.likeDislikePost = (req, res, next) => {
	db.Post.findOne({ _id: req.params.id })
		.then((post) => {
			const like = req.body.like;
			let opinions = {};
			switch (like) {
				case -1: //  Si l'utilisateur dislike le post
					opinions = {
						$push: { usersDisliked: req.body.userId },
						$inc: { dislikes: 1 },
					};
					break;
				case 0: // Si l'utilisateur enlève son like / dislike
					for (let userId of post.usersDisliked)
						if (req.body.userId === userId) {
							opinions = {
								$pull: { usersDisliked: userId },
								$inc: { dislikes: -1 },
							};
						}
					for (let userId of post.usersLiked)
						if (req.body.userId === userId) {
							opinions = {
								$pull: { usersLiked: userId },
								$inc: { likes: -1 },
							};
						}
					break;
				case 1: // Si l'utilisateur like le post
					opinions = {
						$push: { usersLiked: req.body.userId },
						$inc: { likes: 1 },
					};
					break;
			}
			db.Post.updateOne({ _id: req.params.id }, opinions)
				.then(() => res.status(200).json({ message: "Le post a été liké" }))
				.catch((error) => res.status(500).json({ error }));
		})
		.catch((error) => res.status(500).json({ error }));
};
