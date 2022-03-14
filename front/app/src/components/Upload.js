import "../styles/auth/Log.css";
import { useState } from "react";
import NavBar from "./NavBar";
import axios from "axios";

const Upload = () => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [message, setMessage] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	// Au click sur "Publier"
	const upload = (e) => {
		e.preventDefault();
		const token = localStorage.getItem("token");

		const formData = new FormData();
		formData.append("title", title);
		formData.append("imageUrl", imageUrl);
		formData.append("description", description);

		const config = {
			headers: {
				"Content-Type": "multipart/form-data",
				Authorization: `Bearer ${token}`,
			},
		};
		console.log(config);
		axios
			.post("http://localhost:4000/api/post/upload", formData, config)
			.then((res) => {
				console.log(res);
				setDescription("");
				setImageUrl("");
				setTitle("");
			})
			.catch((err) => {
				setMessage("Un problème est survenu merci de réessayer plutard");
			});
	};

	return (
		<form action="" onSubmit={upload} className="Signup">
			<NavBar />
			<h1>Create A Post</h1>
			<div className="message">{message}</div>
			<label className="Signup">
				<input
					type="text"
					placeholder="Title"
					required
					onChange={(e) => setTitle(e.target.value)}
					value={title}
				/>
				<div className="message">{errorMessage}</div>
				<br />
				<input
					type="text"
					placeholder="Description"
					required
					onChange={(e) => setDescription(e.target.value)}
					value={description}
				/>
				<div className="message">{errorMessage}</div>
				<br />
				<input
					accept="image/*"
					id="file"
					name="file"
					type="file"
					required
					onChange={(e) => setImageUrl(e.target.files[0])}
				/>
				<br />
				<input id="submit-btn" type="submit" value="Upload" />
			</label>
		</form>
	);
};

export default Upload;
