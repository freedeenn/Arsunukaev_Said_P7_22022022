import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import "../styles/auth/Log.css";

export default function Log() {
	const [SignupModal, setSignupModal] = useState(false);
	const [LoginModal, setLoginModal] = useState(true);

	const handleModals = (e) => {
		if (e.target.id === "register") {
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
					id="register"
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
