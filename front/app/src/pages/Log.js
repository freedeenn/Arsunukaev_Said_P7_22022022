import { useState } from "react";
import Login from "../auth/Login";
import Signup from "../auth/Signup";
import "../styles/auth/Log.css";

export default function Log() {
	const [SignupModal, setSignupModal] = useState(false);
	const [LoginModal, setLoginModal] = useState(true);

	const handleModals = (e) => {
		if (e.target.id === "signup") {
			setLoginModal(false);
			setSignupModal(true);
		} else if (e.target.id === "login") {
			setSignupModal(false);
			setLoginModal(true);
		}
	};
	return (
		<div className="connection">
			<ul>
				<li
					onClick={handleModals}
					id="login"
					className={LoginModal ? "active-btn" : null}
				>
					Login
				</li>
				<li
					onClick={handleModals}
					id="signup"
					className={SignupModal ? "active-btn" : null}
				>
					SignUp
				</li>
			</ul>
			{SignupModal && <Signup />}
			{LoginModal && <Login />}
		</div>
	);
}
