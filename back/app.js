const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const path = require("path");
const helmet = require("helmet");
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// const commentRoutes = require("./routes/comment");
const postRoutes = require("./routes/post");
const userRoutes = require("./routes/user");

// Gestion des erreurs CORS (accès interdit aux autres serveurs)
app.use(cors());
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
	res.setHeader("Access-Control-Allow-Credentials", true);
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
	);
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, DELETE, PATCH, OPTIONS"
	);
	next();
});

app.use("/images", express.static(path.join(__dirname, "images")));

app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

// app.use("/api/comment", commentRoutes);
app.use("/api/post", postRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;
