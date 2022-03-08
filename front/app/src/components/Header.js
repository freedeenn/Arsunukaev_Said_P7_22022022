import "../styles/Header.css";
import logo from "../assets/logo.png";

function Header({ children }) {
	return (
		<div className="header">
			{children}
			<img src={logo} alt="Groupomania" className="logo" />
			<h1 className="title">Groupomania</h1>
		</div>
	);
}

export default Header;
