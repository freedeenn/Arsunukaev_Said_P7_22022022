import axios from "axios";
import { useState, useEffect } from "react";
import Post from "./Post";

const Comment = ({ comment }) => {
	const [Comment, setComment] = useState("");
	const token = localStorage.getItem("token");
	const config = {
		headers: {
			"Content-Type": "multipart/form-data",
			Authorization: `Bearer ${token}`,
		},
	};

	useEffect(() => {
		axios
			.get(`http://localhost:4000/api/comment`, config)
			.then((res) => {
				setComment(res.data);
			})
			.catch((err) => console.log(err));
	}, []);
	return (
		<div>
			{Comment.length > 0
				? Comment.map((comment) => (
						<div key={comment.id} comment={comment}>
							<h5>{comment.UserId}</h5>
							<p>{comment.comment}</p>
						</div>
				  ))
				: null}
		</div>
	);
};

export default Comment;
