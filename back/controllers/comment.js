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
	const token = req.headers.authorization.split(" ")[1];
	const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
	const userId = decodedToken.userId;
	const isAdmin = decodedToken.isAdmin;
	db.Comment.findOne({ where: { id: req.params.id } }).then((comment) => {
		if (comment.UserId === userId || isAdmin === true) {
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
