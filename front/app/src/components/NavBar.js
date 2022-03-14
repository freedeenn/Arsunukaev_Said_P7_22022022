import "../styles/NavBar.css";
import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
// import { userIdContext } from "./AppContext";

function Header({ children }) {
	// const userId = useContext(userIdContext);
	const [loggedIn, setLoggedIn] = useState(false);

	useEffect(() => {
		setLoggedIn(localStorage.getItem("loggedIn"));
	}, [localStorage.getItem("loggedIn")]);

	return (
		<div className="header">
			{children}
			<div>
				<NavLink to="/">
					<img src={logo} alt="Groupomania" className="logo" />
					<h1 className="title">Groupomania</h1>
				</NavLink>
				{loggedIn !== false && (
					<>
						<ul>
							<li className="Welcome">
								<NavLink to="/profil">Profil</NavLink>
								<NavLink to="/Upload">Upload</NavLink>
								<NavLink to="/profil">Log-Out</NavLink>
							</li>
						</ul>
					</>
				)}
			</div>
		</div>
	);
}

export default Header;
