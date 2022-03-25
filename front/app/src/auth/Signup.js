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
	const [firstNameError, setFirstNameError] = useState("");
	const [lastNameError, setLastNameError] = useState("");
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [controlPasswordError, setControlPasswordError] = useState("");

	const handleSignup = async (e) => {
		e.preventDefault();

		if (password !== controlPassword) {
			setControlPasswordError("password error");
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
					setFormSubmit(true);
				})
				.catch((error) => {
					console.error(error.response.data.error);
					setFirstNameError(error.response.data.message);
					setLastNameError(error.response.data.message);
					setEmailError(error.response.data.error, error.response.data.message);
					setPasswordError(error.response.data.message);
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
					<div className="message" style={{ color: "red" }}>
						{firstNameError}
					</div>
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
					<div className="message" style={{ color: "red" }}>
						{lastNameError}
					</div>
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
					<div className="message" style={{ color: "red" }}>
						{emailError}
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
						{passwordError}
					</div>
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
					<div className="message" style={{ color: "red" }}>
						{controlPasswordError}
					</div>
					<br />
					<input id="submit-btn" type="submit" value="Sign Up" />
				</form>
			)}
		</>
	);
};
export default Signup;
