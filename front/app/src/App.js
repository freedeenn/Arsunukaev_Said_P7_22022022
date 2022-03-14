import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { userIdContext } from "./components/AppContext";
import axios from "axios";
import Home from "./components/Home";
import Profil from "./components/Profil";
import Upload from "./components/Upload";
import Logout from "./auth/Logout";

function App() {
	const [token, setToken] = useState(null);

	useEffect(async () => {
		await axios({
			method: "get",
			url: `${"http://localhost:4000/api/auth"}`,
			withCredentials: true,
		})
			.then((res) => {
				console.log(res);
				setToken(res.data);
			})
			.catch((err) => console.log("no token"));
	}, [token]);
	return (
		<userIdContext.Provider value={token}>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/Profil" element={<Profil />} />
				<Route path="/Profil" element={<Logout />} />
				<Route path="/Upload" element={<Upload />} />
			</Routes>
		</userIdContext.Provider>
	);
}

export default App;
