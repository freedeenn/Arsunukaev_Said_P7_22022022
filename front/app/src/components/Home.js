import NavBar from "./NavBar";
import { useState, useEffect } from "react";
// import axios from "axios";

const Home = () => {
	useEffect(() => {
		if (!localStorage.getItem("loggedIn")) {
			localStorage.setItem("loggedIn", false);
		}
	}, []);

	// const [firstName, setFirstName] = useState("");
	// const [lastName, setLastName] = useState("");

	// const handleUsers = (e) => {
	// 	e.preventDefault();

	// 	axios({
	// 		method: "get",
	// 		url: `${"http://localhost:4000/api/auth/"}`,
	// 		users: {
	// 			lastName,
	// 			firstName,
	// 		},
	// 	})
	// 		.then((res) => {
	// 			console.log(res.users);
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 		});
	// };
	return (
		<div>
			<NavBar />
			{/* <Users users={handleUsers} /> */}
		</div>
	);
};

export default Home;
