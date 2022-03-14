import Log from "../auth/Log";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
// import { userIdContext } from "./AppContext";
// import { useContext } from "react";

const Profil = () => {
	const [loggedIn, setLoggedIn] = useState(false);
	let navigate = useNavigate();

	useEffect(() => {
		setLoggedIn(localStorage.getItem("loggedIn"));
	}, [localStorage.getItem("loggedIn")]);
	return (
		<div className="container">
			{loggedIn ? (
				navigate("/")
			) : (
				<div>
					<NavBar />
					<Log />
					<Footer />
				</div>
			)}
		</div>
	);
};
export default Profil;
