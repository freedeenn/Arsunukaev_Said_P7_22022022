const models = require("../models");
const jwt = require("jsonwebtoken");
const Post = models.post;
const User = models.user;
const Comment = models.comment;
const db = require("../models/index");

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
	Post.hasMany(Comment, { foreignKey: "postId" });
	Comment.belongsTo(Post, {
		foreignKey: "postId",
		onDelete: "CASCADE",
		hooks: true,
	});
	Comment.findOne({ where: { id: req.params.id } });
	if (Comment.userId === req.body.id || isAdmin === true) {
		Comment.destroy({ where: { id: req.params.id } }).then(() => {
			res.status(200).json({
				message: "Commentaire supprimé !",
			});
		});
	} else {
		res.status(401).json({
			message: "Impossible de supprimer le commentaire ",
		});
	}
};

// Récupérer les commentaires du post
exports.getCommentsByPost = (req, res) => {
	// Post.hasMany(Comment, { foreignKey: "postId" });
	// Comment.belongsTo(Post, { foreignKey: "postId" });
	// User.hasMany(Comment, { foreignKey: "userId" });
	// Comment.belongsTo(User, { foreignKey: "userId" });
	db.Comment.findAll({
		where: {
			postId: req.params.id,
		},
		// attributes: ["comment", "createdAt", "userId", "id"],
		// include: [
		// 	{
		// 		model: User,
		// 		attributes: ["firstName", "lastName", "id"],
		// 	},
		// ],
	})
		.then((comment) => {
			res.status(200).json(comment);
		})
		.catch((error) => {
			res.status(400).json({ error: error.message });
		});
};
exports.getAllComments = (req, res) => {
	// User.hasMany(Post, { foreignKey: "userId" });
	// Post.belongsTo(User, { foreignKey: "userId" });
	// User.hasMany(Comment, { foreignKey: "userId" });
	// Comment.belongsTo(User, { foreignKey: "userId" });
	// Post.hasMany(Comment, { foreignKey: "postId" });
	// Comment.belongsTo(Post, { foreignKey: "postId" });
	db.Comment.findAll({
		// attributes: ["comment", "createdAt", "userId", "id", "postId", "updatedAt"],
		// include: [
		// 	{
		// 		model: User,
		// 		attributes: ["firstName", "lastName", "id"],
		// 	},
		// ],
	})
		.then((comments) => {
			res.status(200).json(comments);
		})
		.catch((error) => {
			res.status(400).json({ error: error.message });
		});
};
