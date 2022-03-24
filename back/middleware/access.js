import { findOne } from "../models/Post";
export default (req, res, next) => {
	try {
		findOne({ _id: req.params.id }) // retrouver un élément par son id
			.then((post) => {
				if (post.userId !== req.auth.userId) {
					throw "Vous avez pas le droit !"; //Renvoie l'erreur
					// si tout va bien, suivant
				} else {
					next();
				}
			}) // res : promesse ok
			.catch((error) => res.status(404).json({ error }));
	} catch {
		// renvoyer une erreur 401, problème d'authentification
		res.status(401).json({ error: new Error("La requete n'est pas valide !") });
	}
};
