import { useNavigate } from "react-router-dom";

const LogOut = () => {
	let navigate = useNavigate();
	navigate("/");
	localStorage.clear();

	return <input type="submit" value="LogOut" />;
};

export default LogOut;
