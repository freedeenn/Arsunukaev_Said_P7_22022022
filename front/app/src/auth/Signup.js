import "../styles/auth/Log.css";
import axios from "axios";
import { useState } from "react";
import Login from "./Login";
const Signup = () => {
	const [formSubmit, setFormSubmit] = useState(false);
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [controlPassword, setControlPassword] = useState("");

	const handleSignup = async (e) => {
		e.preventDefault();
		const firstNameError = document.querySelector(".firstName.error");
		const lastNameError = document.querySelector(".lastName.error");
		const emailError = document.querySelector(".email.error");
		const passwordError = document.querySelector(".password.error");
		const ControlPasswordError = document.querySelector(
			".ControlPassword.error"
		);
		if (password !== controlPassword) {
			ControlPasswordError.innerHTML = "password error";
		} else {
			await axios({
				method: "post",
				url: `${"http://localhost:4000/api/auth/signup"}`,
				data: {
					email,
					password,
					firstName,
					lastName,
				},
			})
				.then((res) => {
					console.log(res);
					if (res.data.errors) {
						firstNameError.innerHTML = res.data.errors.firstName;
						lastNameError.innerHTML = res.data.errors.lastName;
						emailError.innerHTML = res.data.errors.email;
						passwordError.innerHTML = res.data.errors.password;
					} else {
						setFormSubmit(true);
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	return (
		<>
			{formSubmit ? (
				<>
					<Login />
					<h4 className="success">Registration Successful</h4>
				</>
			) : (
				<form action="" onSubmit={handleSignup} id="signup">
					<label htmlFor="firstName">firstName</label>
					<input
						type="text"
						name="firstName"
						id="firstName"
						required
						onChange={(e) => setFirstName(e.target.value)}
						value={firstName}
					/>
					<div className="firstNameError"></div>
					<br />
					<label htmlFor="lastName">lastName</label>
					<input
						type="text"
						name="lastName"
						id="lastName"
						required
						onChange={(e) => setLastName(e.target.value)}
						value={lastName}
					/>
					<div className="lastNameError"></div>
					<br />
					<label htmlFor="email">email</label>
					<input
						type="email"
						name="email"
						id="email"
						required
						onChange={(e) => setEmail(e.target.value)}
						value={email}
					/>
					<div className="emailError"></div>
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
					<div className="passwordError"></div>
					<br />
					<label htmlFor="controlPassword">password</label>
					<input
						type="password"
						name="controlPassword"
						id="controlPassword"
						required
						onChange={(e) => setControlPassword(e.target.value)}
						value={controlPassword}
					/>
					<div className="ControlPasswordError"></div>
					<br />
					<input id="submit-btn" type="submit" value="Sign Up" />
				</form>
			)}
		</>
	);
};
export default Signup;
