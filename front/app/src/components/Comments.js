import Button from "./Button";
import "../styles/Comments.css";
import Comment from "./Comment";
import { useEffect, useState } from "react";
import axios from "axios";

const Comments = ({ post }) => {
	const [Comments, setComments] = useState("");
	const token = localStorage.getItem("token");
	const config = {
		headers: {
			"Content-Type": "multipart/form-data",
			Authorization: `Bearer ${token}`,
		},
	};

	const Send = (e) => {
		e.preventDefault();

		useEffect(() => {
			axios
				.post(
					`http://localhost:4000/api/comment/create${post.id}`,
					config,
					Comments
				)
				.then((res) => {
					console.log(res);
				})
				.catch((error) => {
					console.log(error);
				});
		});
	};
	return (
		<form action="" onSubmit={Send} className="form-comment">
			<div className="form-control">
				<Comment post={post} />
				<input
					type="text"
					placeholder="Comment"
					// required
					onChange={(e) => setComments(e.target.value)}
					value={Comments}
				/>
				<input id="btn" type="submit" value={Send} />
			</div>
		</form>
	);
};

export default Comments;
