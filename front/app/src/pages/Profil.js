import Log from "./Log";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
// import { userIdContext } from "./AppContext";
// import { useContext } from "react";

const Profil = () => {
	const [loggedIn, setLoggedIn] = useState(false);
	// const [userInfo, setUserInfo] = useState("");
	const userInfo = localStorage.getItem("userInfo");
	let navigate = useNavigate();
	console.log(userInfo);

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
