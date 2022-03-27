import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { userIdContext } from "./components/AppContext";
import axios from "axios";
import Home from "./pages/Home";
import Profil from "./pages/Profil";
import Upload from "./pages/Upload";
import LogOut from "./auth/Logout";

function App() {
	const [token, setToken] = useState(null);

	useEffect(() => {
		axios({
			method: "get",
			url: `${"http://localhost:4000/api/auth/1"}`,
			withCredentials: true,
		})
			.then((res) => {
				setToken(res.data);
			})
			.catch((err) => console.log("no token"));
	}, []);
	return (
		<userIdContext.Provider value={token}>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/Profil" element={<Profil />} />
				<Route path="/LogOut" element={<LogOut />} />
				<Route path="/Upload" element={<Upload />} />
			</Routes>
		</userIdContext.Provider>
	);
}

export default App;
