import Button from "./Button";
import "../styles/Comments.css";
import Comment from "./Comment";
import { useEffect, useState } from "react";
import axios from "axios";

const Comments = ({ post, comment }) => {
	const [Comments, setComments] = useState("");

	const Add = (e) => {
		e.preventDefault();
		console.log("click");
		const token = localStorage.getItem("token");
		const formData = new FormData();
		formData.append("Comment", Comment);

		// const config = {
		// 	headers: {
		// 		"Content-Type": "multipart/form-data",
		// 		Authorization: `Bearer ${token}`,
		// 	},
		// };

		// useEffect(() => {
		// 	axios
		// 		.post(`http://localhost:4000/api/comment/create`, config, formData)
		// 		.then((res) => {
		// 			setAddComment("");
		// 		});
		// });
	};
	return (
		<form className="form-comment">
			<div className="form-control">
				<Comment post={post} />
				<input
					type="text"
					placeholder="Comment"
					// required
					onChange={(e) => setComments(e.target.value)}
					value={Comments}
				/>
				<input id="btn" type="submit" value="Add" />
			</div>
		</form>
	);
};

export default Comments;
