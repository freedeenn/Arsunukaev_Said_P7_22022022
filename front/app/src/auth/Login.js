import "../styles/auth/Log.css";
import axios, { useState } from "react";
// import { Link } from "react-router-dom";
export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = (e) => {
		e.preventDefault();
		const emailError = document.querySelector(".email.error");
		const passwordError = document.querySelector(".password.error");

		axios({
			method: "post",
			url: `${process.env.REACT_APP_API_URL}api/auth/login`,
			whithCredentials: true,
			data: {
				email,
				password,
			},
		})
			.then((res) => {
				if (res.data.errors) {
					emailError.innerHTML = res.data.errors.email;
					passwordError.innerHTML = res.data.errors.password;
				} else {
					window.location = "/";
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
	return (
		<form action="" onSubmit={handleLogin} id="signup">
			<label htmlFor="email">Email</label>
			<br />
			<input
				type="text"
				name="email"
				id="email"
				onChange={(e) => setEmail(e.target.value)}
				value={email}
			/>
			<div className="email error"></div>
			<br />
			<label htmlFor="password">password</label>
			<br />
			<input
				type="password"
				name="password"
				id="password"
				onChange={(e) => setPassword(e.target.value)}
			/>
			<div className="password error"></div>
			<br />
			<input type="submit" value="Login" />
		</form>
		/* // <div>
		// 	<div className="Login">
		// 		<input type="text" placeholder="login" />
		// 		<input type="password" placeholder="password" />
		// 		<button>Login</button>
		// 		{/* <nav>
		// 			<Link to="/Signup">Sign-up</Link>
		// 		</nav> */
		/* // 	</div> */
		/* // </div> */
	);
}
