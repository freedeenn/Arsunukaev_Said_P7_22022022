import { useState, useEffect } from "react";
import "../styles/Post.css";
import axios from "axios";
import { FaTimes } from "react-icons/fa";
import Button from "./Button";
import AddComment from "./AddComment";
import Comment from "./Comment";

const Post = ({ post }) => {
	const [Post, setPost] = useState([]);
	const [User, setUser] = useState("");
	const [showAddComment, setShowAddComment] = useState(false);
	const token = localStorage.getItem("token");
	const config = {
		headers: {
			"Content-Type": "multipart/form-data",
			Authorization: `Bearer ${token}`,
		},
	};
	//SUPPRIMER POST///////////////////////////////////////////
	const DeletePost = async (id) => {
		await axios.delete(`http://localhost:4000/api/post/delete/${id}`, config);

		setPost(Post.filter((post) => post.id !== id));
	};
	///////////////////////////////////////////////////////////

	//REQUETTE GET//
	useEffect(() => {
		axios
			.get("http://localhost:4000/api/post", config)
			.then((res) => {
				setPost(res.data);
			})
			.catch((err) => console.log(err));
	}, []);

	useEffect(() => {
		axios
			.get("http://localhost:4000/api/auth", config)
			.then((res) => {
				setUser(res.data);
				console.log(res.data);
			})
			.catch((err) => console.log(err));
	}, []);

	//AFFICHAGE//
	return (
		<div>
			{Post.length > 0
				? Post.map((post) => (
						<div key={post.id} post={post}>
							<div className="Container">
								<div className="Post">
									<h5>
										{Post.map((User) => {
											console.log(User.id);
											if (User.id === post.UserId) {
												return post.UserId;
											}
										})}
									</h5>
									<div className="Image">
										<img src={post.imageUrl} alt="" />
									</div>
									<div className="Content">
										<h2>
											{post.title}{" "}
											<FaTimes onClick={() => DeletePost(post.id)} />
										</h2>
										<div>
											{post.description}
											<Button />
											<AddComment />
										</div>
									</div>
								</div>
							</div>
						</div>
				  ))
				: "No Post to show"}
		</div>
	);
};

export default Post;
