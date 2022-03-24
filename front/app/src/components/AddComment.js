import Button from "./Button";
import "../styles/AddComment.css";
import Comment from "./Comment";
import { useEffect, useState } from "react";
import axios from "axios";

const AddComment = ({ post, comment }) => {
	const [addComment, setAddComment] = useState("");

	const Add = (e) => {
		e.preventDefault();
		console.log("click");
		const token = localStorage.getItem("token");
		const formData = new FormData();
		formData.append("addComment", addComment);

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
				<Comment />
				<input
					type="text"
					placeholder="Add Comment"
					// required
					onChange={(e) => setAddComment(e.target.value)}
					value={addComment}
				/>
				<input id="btn" type="submit" value="Add" />
			</div>
		</form>
	);
};

export default AddComment;
