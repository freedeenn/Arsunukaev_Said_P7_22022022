import "../styles/auth/Log.css";
// import { Link } from "react-router-dom";
export default function Signup() {
	return (
		<div>
			<div className="Signup">
				<input type="text" placeholder="firstName" />
				<input type="text" placeholder="lastName" />
				<input type="text" placeholder="email" />
				<input type="password" placeholder="password" />
				<button>Sign up</button>
				{/* <nav>
					<Link to="/Login">Login</Link>
				</nav> */}
			</div>
		</div>
	);
}
