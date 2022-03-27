// // const post = require("../models/Post");
const db = require("../models/index");
const User = require("../models/User");
// const Post = require("../models/Post");
// module.exports = (req, res, next) => {
// 	try {
// 		console.log(db.Post.userId);
// 		findOne({ where: { id: req.params.id } }) // retrouver un élément par son id
// 			.then((post) => {
// 				if (db.Post.UserId !== req.auth.userId) {
// 					console.log(req.auth.userId);
// 					throw "Vous avez pas le droit !"; //Renvoie l'erreur
// 					// si tout va bien, suivant
// 				} else {
// 					next();
// 				}
// 			}) // res : promesse ok
// 			.catch((error) => res.status(404).json({ error }));
// 	} catch {
// 		// renvoyer une erreur 401, problème d'authentification
// 		res.status(401).json({ error: new Error("La requete n'est pas valide !") });
// 	}
// };
exports.deleteUser = (req, res) => {
	db.User.findOne({ where: { id: req.params.id } })
		.then((user) => {
			console.log("---------");
			console.log(user.id === req.auth.userId);
			console.log("---------");
			if (user.id === req.auth.userId || user.isAdmin === true) {
				res.status(200).json({ message: "La requete est valide !" });
			} else {
				res.status(400).json({ message: "La requete n'est pas valide !" });
			}
		})
		.catch((error) => res.status(500).json({ error: error.message }));
};
exports.deletePost = (req, res) => {
	db.Post.findOne({ where: { id: req.params.id } })
		.then((post) => {
			console.log("---------");
			console.log(user.id === req.auth.userId);
			console.log("---------");
			if (post.id === req.auth.userId || user.isAdmin === true) {
				res.status(200).json({ message: "La requete est valide !" });
			} else {
				res.status(400).json({ message: "La requete n'est pas valide !" });
			}
		})
		.catch((error) => res.status(500).json({ error: error.message }));
};
