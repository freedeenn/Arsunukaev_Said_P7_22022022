import { useState, useEffect } from "react";
import "../styles/Post.css";
import axios from "axios";
import { FaTimes } from "react-icons/fa";
import Button from "./Button";
import Comments from "./Comments";

const Post = ({ post }) => {
	const [Post, setPost] = useState([]);
	const [showComments, setShowComments] = useState(false);
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
			.catch((error) => console.log(error));
	}, []);

	//AFFICHAGE//
	return (
		<div>
			{Post.length > 0
				? Post.map((post) => (
						<div key={post.id} post={post}>
							<div className="Container">
								<div className="Post">
									{/* {console.log(post)} */}
									<h5>
										{Post.map((User) => {
											if (User.id === post.UserId) {
												return `${post.User.firstName} ${post.User.lastName}`;
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
										<div className="description">
											{post.description}
											<Button
												onClick={() => setShowComments(!showComments)}
												post={post}
												text="comment"
											/>
											{/* {console.log(post.Comments)} */}
											{showComments && <Comments post={post} />}
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
