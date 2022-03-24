import { useNavigate } from "react-router-dom";

const Logout = () => {
	let navigate = useNavigate();

	localStorage.clear();
	navigate("/profil");

	return <input type="submit" value="logout" />;
};

export default Logout;
