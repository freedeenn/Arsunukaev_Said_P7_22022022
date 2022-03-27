import axios from "axios";
import { useState, useEffect } from "react";

const Comment = ({ post }) => {
	const [Comment, setComment] = useState("");
	const [Post, setPost] = useState([]);
	const token = localStorage.getItem("token");
	const config = {
		headers: {
			"Content-Type": "multipart/form-data",
			Authorization: `Bearer ${token}`,
		},
	};
	//REQUETTE GET//
	// useEffect(() => {
	// 	axios
	// 		.get(`http://localhost:4000/api/comment`, config)
	// 		.then((res) => {
	// 			setComment(res.data);
	// 		})
	// 		.catch((err) => console.log(err));
	// }, []);
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
			{
				// Comment.length > 0
				// 	?
				post.Comments.map((comment) => (
					<div id="comment" key={comment.id} post={post}>
						{console.log(post.Comments.comment)}
						{/* <h5>
							{post.map((User) => {
								if (User.id === comment.UserId) {
									return `${comment.User.firstName} ${comment.User.lastName} : `;
								}
							})}
						</h5> */}
						<p>{comment.comment}</p>
					</div>
				))
				// : null
			}
		</div>
	);
};

export default Comment;
