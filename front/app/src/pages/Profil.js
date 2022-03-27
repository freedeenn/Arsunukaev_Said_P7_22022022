import Log from "./Log";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "../components/Button";
import axios from "axios";
// import { userIdContext } from "./AppContext";
// import { useContext } from "react";

const Profil = () => {
	const [loggedIn, setLoggedIn] = useState(false);
	const userInfo = localStorage.getItem("userInfo");
	const token = localStorage.getItem("token");
	const userId = localStorage.getItem("userId");
	const config = {
		headers: {
			"Content-Type": "multipart/form-data",
			Authorization: `Bearer ${token}`,
		},
	};
	let navigate = useNavigate();

	useEffect(() => {
		setLoggedIn(localStorage.getItem("loggedIn"));
	}, [localStorage.getItem("loggedIn")]);
	const DeleteUser = (e) => {
		e.preventDefault();
		useEffect(() => {
			axios
				.delete(`http://localhost:4000/api/auth/${userId}`, config)
				.then((res) => {
					console.log(res.data);
				})
				.catch((error) => console.log(error));
		}, []);
	};

	//AFFICHAGE//
	return (
		<form action="" onSubmit={DeleteUser} className="profil">
			<NavBar />
			{loggedIn ? (
				<div className="profil">
					<div className="content">
						<h5>{userInfo}</h5>
						<input id="submit-btn" type="submit" value="Delete User" />
					</div>
				</div>
			) : (
				<div>
					<Log />
				</div>
			)}
			<Footer />
		</form>
	);
};
export default Profil;
