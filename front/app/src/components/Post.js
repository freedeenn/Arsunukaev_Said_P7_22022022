import { useState, useEffect } from "react";
import "../styles/Post.css";
import axios from "axios";
import { FaTimes } from "react-icons/fa";
import Button from "./Button";
import Comments from "./Comments";
import { NavLink } from "react-router-dom";

const Post = ({ post, onToggle }) => {
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
	const deletePost = async (id) => {
		await axios.delete(`http://localhost:4000/api/post/delete/${id}`, config);

		setPost(Post.filter((post) => post.id !== id));
		console.log(id);
	};
	///////////////////////////////////////////////////////////

	//REQUETTE GET POSTS//
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
			{Post.length > 0 ? (
				Post.map((post, index) => (
					<div key={post.id} post={post}>
						<div className="Container">
							<div className="Post">
								<h5>
									<NavLink to="/profil">
										{post.User.firstName} {post.User.lastName}{" "}
									</NavLink>
									: {post.createdAt}
								</h5>
								<div className="Image">
									<img src={post.imageUrl} alt="" />
								</div>
								<div className="Content">
									<h2>{post.title} </h2>
									<FaTimes onClick={() => deletePost(post.id)} />

									<div className="description">
										{post.description}
										<p>{index}</p>
										<Button
											onClick={() => onToggle(post.id)}
											post={post}
											text="comment"
											onClick={() => setShowComments(!showComments)}
										/>
										{showComments && <Comments post={post} />}
									</div>
								</div>
							</div>
						</div>
					</div>
				))
			) : (
				<div
					style={{
						color: "#8B0000",
						textAlign: "center",
						marginTop: "20px",
					}}
				>
					No Post to show
				</div>
			)}
		</div>
	);
};

export default Post;
