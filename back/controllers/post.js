const models = require("../models");
const sequelize = require("../config/sequelize");
const Post = models.posts;
const User = models.users;
const Comment = models.comments;
const fs = require("fs");
const db = require("../models/index");
const jwt = require("jsonwebtoken");

/// CREER LE POST ///
exports.createPost = (req, res, next) => {
	const token = req.headers.authorization.split(" ")[1];
	const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
	const userId = decodedToken.userId;

	const imageUrl = req.file
		? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
		: null;

	db.post = new db.Post({
		userId: userId,
		title: req.body.title,
		description: req.body.description,
		imageUrl: imageUrl,
	});
	console.log(req.body);
	console.log("db.post");

	db.post
		.save()
		.then((res) => res.status(201).json({ message: "Post créé !" }))
		.catch((error) => res.status(400).json({ error: "problem ici" }));

	// db.Post.create({
	// 	userId: userId,
	// 	title: req.body.title,
	// 	description: req.body.description,
	// 	imageUrl: imageUrl,
	// })
	// 	.then((post) => {
	// 		res.status(201).json(post);
	// 	})
	// 	.catch((error) => {
	// 		console.log(error);
	// 		return res.status(400).json({ error: "post problem" });
	// 	});
};

exports.modifyPost = (req, res, next) => {
	const messageObject = req.file
		? {
				...req.body.message,
				messageUrl: `${req.protocol}://${req.get("host")}/images/${
					req.file.filename
				}`,
		  }
		: { ...req.body };

	Post.update(
		{ ...messageObject, id: req.params.id },
		{ where: { id: req.params.id } }
	)
		.then(() => res.status(200).json({ message: "Message modifié !" }))
		.catch((error) => res.status(400).json({ error }));
};

/// AFFICHER TOUTES LES POSTS //
exports.getAllPosts = (req, res, next) => {
	Post.find() // request : retrouver tout
		.then((posts) => res.status(200).json(posts)) // res : promesse ok
		.catch((error) => res.status(400).json({ error }));
};

/// AFFICHER UN POST //
exports.getOnePost = (req, res, next) => {
	Post.findOne({ _id: req.params.id }) // retrouver un élément par son id
		.then((post) => res.status(200).json(post)) // res : promesse ok
		.catch((error) => res.status(404).json({ error }));
};

/// MODIFIER UN POST //
exports.modifyPost = (req, res, next) => {
	if (req.file) {
		// si la request concerne le changement du file, donc l'image
		Post.findOne({ _id: req.params.id }) //on trouve le post concernée par son id
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
					Post.updateOne(
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
		Post.updateOne(
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

/// SUPPRIMER UN POST //
exports.deletePost = (req, res, next) => {
	Post.findOne({ _id: req.params.id })
		.then((post) => {
			/* récupérer l'imageUrl retournée par la BDD, stockée dans /images/
    qu'on peut split vu qu'elle est entre deux chemins /.../
    split va retourner deux éléments dans un tableau :
    xxxAxxx/images/xxxBxxx et on s'intéresse au nom du fichier,
    donc le 2ème élément qui est B, d'où le [1] à la fin */
			const filename = post.imageUrl.split("/images/")[1];
			// fonction pour supprimer l'image dans le système
			// et ensuite l'id correpondant
			fs.unlink(`images/${filename}`, () => {
				Post.deleteOne({ _id: req.params.id })
					.then(() =>
						res.status(200).json({ message: "Le post a bien été supprimée !" })
					)
					.catch((error) => res.status(400).json({ error }));
			});
		})
		.catch((error) => res.status(500).json({ error }));
};

/// LIKE OU DISLIKE UN POST //
// Like et dislikes
exports.likeDislikePost = (req, res, next) => {
	Post.findOne({ _id: req.params.id })
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
			Post.updateOne({ _id: req.params.id }, opinions)
				.then(() => res.status(200).json({ message: "Le post a été liké" }))
				.catch((error) => res.status(500).json({ error }));
		})
		.catch((error) => res.status(500).json({ error }));
};
