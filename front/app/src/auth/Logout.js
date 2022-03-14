import axios from "axios";
import { useEffect, useState } from "react";

const Logout = () => {
	const logout = async ({ logout }) => {
		const [loggedIn, setLoggedIn] = useState("");
		const onClick = () => {
			console.log(logout);
		};
	};
	return <li onClick={logout}></li>;
};

export default Logout;
