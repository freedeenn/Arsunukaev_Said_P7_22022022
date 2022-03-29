// import { useNavigate } from "react-router-dom";

const LogOut = () => {
	// let navigate = useNavigate();

	localStorage.clear();
	window.location.href = "http://localhost:3000";
	// window.location.reload();
	// navigate("/");
	return <div></div>;
};

export default LogOut;
