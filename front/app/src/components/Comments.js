import Button from "./Button";
import "../styles/Comments.css";
import Comment from "./Comment";
import { useEffect, useState } from "react";
import axios from "axios";

const Comments = ({ post }) => {
	const [comments, setComments] = useState("");
	const [sendComment, setSendComment] = useState("");
	const token = localStorage.getItem("token");
	const userId = localStorage.getItem("userId");
	const config = {
		headers: {
			"Content-Type": "multipart/form-data",
			Authorization: `Bearer ${token}`,
		},
	};
	const postId = post.id;
	console.log(postId);

	const Send = (e) => {
		e.preventDefault();

		axios({
			method: "post",
			url: `${"http://localhost:4000/api/comment/create"}`,
			config,
			sendComment,
			postId,
		})
			// axios
			// 	.post(`http://localhost:4000/api/comment/create`, config, comment, postId)
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	//REQUETTE GET//
	useEffect(() => {
		axios
			.get(`http://localhost:4000/api/comment`, config)
			.then((res) => {
				setComments(res.data);
			})
			.catch((err) => console.log(err));
	}, []);
	//AFFICHAGE
	return (
		<div>
			<div className="form-control">
				<div className="form-comment">
					{comments.length > 0
						? comments.map((comment) => {
								console.log(comment.postId);
								if (comment.postId === comment.postId) {
									<div id="comment" key={comment.id}>
										<h5>
											{comment.User.firstName} {comment.User.lastName} :{" "}
											{comment.comment}
										</h5>
										<p className="right">{comment.createdAt}</p>
									</div>;
								}
						  })
						: null}
				</div>
				<form action="" onSubmit={Send}>
					<input
						type="text"
						placeholder="Comment"
						// required
						onChange={(e) => setSendComment(e.target.value)}
						value={sendComment}
					/>
					<input id="btn" type="submit" value="Send" />
				</form>
			</div>
		</div>
	);
};

export default Comments;
