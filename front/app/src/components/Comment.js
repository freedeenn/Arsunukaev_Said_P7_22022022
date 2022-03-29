import axios from "axios";
import { useState, useEffect } from "react";

const Comment = ({ post }) => {
	const [comments, setComments] = useState("");
	const [Post, setPost] = useState([]);
	const token = localStorage.getItem("token");
	const config = {
		headers: {
			"Content-Type": "multipart/form-data",
			Authorization: `Bearer ${token}`,
		},
	};
	//REQUETTE GET//
	useEffect(() => {
		axios
			.get(`http://localhost:4000/api/comment`, config)
			.then((res) => {
				setComments(res.data);
				console.log(res.data.comment);
			})
			.catch((err) => console.log(err));
	}, []);
	//REQUETTE GET//
	// useEffect(() => {
	// 	axios
	// 		.get("http://localhost:4000/api/post", config)
	// 		.then((res) => {
	// 			setPost(res.data);
	// 		})
	// 		.catch((error) => console.log(error));
	// }, []);
	console.log(comments);
	//AFFICHAGE//
	return (
		<div>
			{
				// Comment.length > 0
				// 	?
				comments.map((comment) => (
					<div id="comment" key={comment.id}>
						{console.log(comment)}
						<p>
							{console.log(comment.comment)}
							{comment.UserId} {comment.comment}
						</p>
						<p className="right">{comment.createdAt}</p>
						{console.log(post.comment)}
					</div>
				))
				// : null
			}
		</div>
	);
};

export default Comment;
