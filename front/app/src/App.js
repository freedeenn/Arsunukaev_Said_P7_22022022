import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Profil from "./components/Profil";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/Profil" element={<Profil />} />
			</Routes>
		</div>
	);
}

export default App;
