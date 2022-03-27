import "../styles/NavBar.css";
import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
// import { useContext } from "react";
// import { userIdContext } from "./AppContext";

function Header({ children }) {
	// const userId = useContext(userIdContext);
	const [loggedIn, setLoggedIn] = useState(false);

	useEffect(() => {
		setLoggedIn(localStorage.getItem("loggedIn"));
	}, [localStorage.getItem("loggedIn")]);

	//AFFICHAGE//
	return (
		<div className="header">
			{children}
			<div>
				<NavLink to="/">
					<img src={logo} alt="Groupomania" className="logo" />
					<h1 className="title">Groupomania</h1>
				</NavLink>
				{loggedIn ? (
					<>
						<ul>
							<li className="Welcome">
								<NavLink to="/profil">Profil</NavLink>
								<NavLink to="/Upload">Upload</NavLink>
								<NavLink to="/Logout">LogOut</NavLink>
							</li>
						</ul>
					</>
				) : null}
			</div>
		</div>
	);
}

export default Header;
