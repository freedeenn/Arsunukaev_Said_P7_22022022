import "../styles/auth/Log.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	let navigate = useNavigate();

	const handleLogin = (e) => {
		e.preventDefault();

		axios({
			method: "post",
			url: `${"http://localhost:4000/api/auth/login"}`,
			whithCredentials: true,
			data: {
				email,
				password,
			},
		})
			.then((res) => {
				if (res.data.loggedIn) {
					console.log(res);
					localStorage.setItem("loggedIn", true);
					localStorage.setItem("token", res.data.token);
					localStorage.setItem("userId", res.data.userId);
					localStorage.setItem("userInfo", res.data.userInfo);
					navigate("/");
				} else {
					console.log(res);
				}
			})
			.catch((error) => {
				console.error(error.response.data.message);
				setErrorMessage(error.response.data.message);
			});
	};

	return (
		<form action="" onSubmit={handleLogin} id="signup">
			<label htmlFor="email">Email</label>
			<input
				type="email"
				name="email"
				id="email"
				required
				onChange={(e) => setEmail(e.target.value)}
				value={email}
			/>
			<div className="message" style={{ color: "red" }}>
				{errorMessage}
			</div>
			<br />
			<label htmlFor="password">password</label>
			<input
				type="password"
				name="password"
				id="password"
				required
				onChange={(e) => setPassword(e.target.value)}
				value={password}
			/>
			<div className="message" style={{ color: "red" }}>
				{errorMessage}
			</div>

			<br />
			<input id="submit-btn" type="submit" value="Login" />
		</form>
	);
}
