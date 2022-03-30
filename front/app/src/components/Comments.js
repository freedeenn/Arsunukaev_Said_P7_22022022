import Button from "./Button";
import "../styles/Comments.css";
import Comment from "./Comment";
import { useEffect, useState, useCallback } from "react";
import { FaTimes } from "react-icons/fa";
import axios from "axios";

const Comments = ({ post }) => {
	const [comments, setComments] = useState("");
	const [comment, setComment] = useState("");
	const token = localStorage.getItem("token");
	const userId = localStorage.getItem("userId");
	const postId = post.id;
	const config = {
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
			Authorization: `Bearer ${token}`,
		},
	};
	console.log(comments);

	//SUPPRIMER POST///////////////////////////////////////////
	const DeleteComment = async (id) => {
		await axios.delete(
			`http://localhost:4000/api/comment/delete/${id}`,
			config
		);

		setComments(comments.filter((comments) => comments.id !== id));
		console.log(comments);
	};
	///////////////////////////////////////////////////////////

	//POST COMMENT
	const Send = useCallback(
		(e) => {
			e.preventDefault();

			axios
				.post(
					`http://localhost:4000/api/comment/create`,
					{
						comment,
						postId,
					},
					config
				)
				.then((res) => {
					setComment("");
					console.log(res);
				})
				.catch((err) => {
					console.log(err);
				});
		},
		[postId, comment, config]
	);

	//REQUETTE GET COMMENTS//
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
						? comments.map((comment) => (
								// if (post.id === comment.postId) {
								<div id="comment" key={comment.id} post={post.id}>
									<h5>
										<div>
											<p>
												{comment.User.firstName} {comment.User.lastName} :{" "}
												{
													(comment.comment,
													(
														<FaTimes
															onClick={() => DeleteComment(comment.id)}
														/>
													))
												}{" "}
												{/* {<FaTimes onClick={() => DeleteComment(comment.id)} />} */}
											</p>

											<p className="right">{comment.createdAt}</p>
										</div>
									</h5>
								</div>
								// }
						  ))
						: null}
				</div>
				<form action="" onSubmit={Send}>
					<input
						type="text"
						placeholder="Comment"
						// required
						onChange={(e) => setComment(e.target.value)}
						value={comment}
					/>
					<input id="btn" type="submit" value="Send" />
				</form>
			</div>
		</div>
	);
};

export default Comments;
