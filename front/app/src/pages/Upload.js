import "../styles/auth/Log.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import axios from "axios";
import Log from "./Log";

const Upload = () => {
	const loggedIn = localStorage.getItem("loggedIn");
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [image, setImage] = useState(null);
	const [message, setMessage] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	let navigate = useNavigate();

	// Au click sur "Publier"
	const upload = (e) => {
		e.preventDefault();
		const token = localStorage.getItem("token");

		const formData = new FormData();
		formData.append("title", title);
		formData.append("image", image);
		formData.append("description", description);

		const config = {
			headers: {
				"Content-Type": "multipart/form-data",
				Authorization: `Bearer ${token}`,
			},
		};

		axios
			.post("http://localhost:4000/api/post/upload", formData, config)
			.then((res) => {
				console.log(res);
				setDescription("");
				setImage("");
				setTitle("");
				navigate("/");
			})
			.catch((err) => {
				setMessage("Un problème est survenu merci de réessayer plutard");
				setErrorMessage("");
			});
	};

	return (
		<form action="" onSubmit={upload} className="Signup">
			<NavBar />
			{loggedIn ? (
				<>
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
							onChange={(e) => setImage(e.target.files[0])}
						/>
						<br />
						<input id="submit-btn" type="submit" value="upload" />
					</label>
				</>
			) : (
				<Log />
			)}
			<Footer />
		</form>
	);
};

export default Upload;
