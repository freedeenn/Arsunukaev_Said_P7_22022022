import Log from "./Log";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "../components/Button";
import axios from "axios";
// import { userIdContext } from "./AppContext";
// import { useContext } from "react";

const Profil = (e) => {
	const [loggedIn, setLoggedIn] = useState(false);
	const userInfo = localStorage.getItem("userInfo");
	const token = localStorage.getItem("token");
	const userId = localStorage.getItem("userId");
	console.log(userId);
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

		axios
			.delete(`http://localhost:4000/api/auth/delete/${userId}`, config)
			.then((res) => {
				console.log(res.data);
				navigate("/");
				localStorage.clear();
				window.location.reload();
			})
			.catch((error) => console.log(error));
	};

	//AFFICHAGE//
	return (
		<div className="profil">
			<NavBar />
			{loggedIn ? (
				<div className="profil">
					<div className="content">
						<h5>{userInfo}</h5>
						<form action="" onSubmit={DeleteUser}>
							<input type="submit" value="Delete Account" />
						</form>
					</div>
				</div>
			) : (
				<div>
					<Log />
				</div>
			)}
			<Footer />
		</div>
	);
};
export default Profil;
