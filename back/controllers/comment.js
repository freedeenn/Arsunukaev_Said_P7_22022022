const db = require("../models/index");
const models = require("../models");
const Post = models.posts;
const User = models.users;
const Comment = models.comment;
const jwt = require("jsonwebtoken");

// Création d'un commentaire
exports.createComment = (req, res) => {
	db.Comment.create({
		UserId: req.auth.userId,
		PostId: req.body.postId,
		comment: req.body.comment,
	})
		.then((comment) =>
			res.status(200).json({
				...comment,
				message: "Commentaire créé !",
			})
		)
		.catch((error) => {
			res.status(400).json({ error: error.message });
		});
};

// Suppression d'un commentaire
exports.deleteComment = (req, res) => {
	db.Comment.findOne({ where: { id: req.params.id } }).then((comment) => {
		console.log("---------");
		console.log(comment.UserId.isAdmin);
		console.log("---------");
		if (comment.UserId === req.auth.userId || comment.UserId.isAdmin === true) {
			comment.destroy({ where: { id: req.params.id } }).then(() => {
				res.status(200).json({
					message: "Commentaire supprimé !",
				});
			});
		} else {
			res.status(401).json({
				message: "Impossible de supprimer le commentaire ",
			});
		}
	});
};

// Récupérer les commentaires du post
exports.getCommentsByPost = (req, res) => {
	db.Comment.findAll({
		where: {
			postId: req.params.id,
		},
		attributes: ["comment", "createdAt", "userId", "id"],
		include: [
			{
				model: db.User,
				attributes: ["firstName", "lastName", "id"],
			},
		],
	})
		.then((comment) => {
			res.status(200).json(comment);
		})
		.catch((error) => {
			res.status(400).json({ error: error.message });
		});
};
exports.getAllComments = (req, res) => {
	db.Comment.findAll({
		attributes: ["comment", "createdAt", "userId", "id", "postId"],
		include: [db.User],
	})
		.then((comments) => {
			res.status(200).json(comments);
		})
		.catch((error) => {
			res.status(400).json({ error: error.message });
		});
};
