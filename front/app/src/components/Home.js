import Button from "./Button";
import Header from "./Header";
import Users from "./Users";
import { useState } from "react";

const Home = () => {
	const onClick = () => {
		console.log("onClick");
	};
	const [users, setUsers] = useState([
		{
			id: 1,
			firstName: "Said",
			lastName: "Bers",
			email: "freedeenn@gmail.com",
			isAdmin: "Admin",
		},
		{
			id: 2,
			firstName: "Said",
			lastName: "Bers",
			email: "freedeenn@gmail.com",
			isAdmin: false,
		},
		{
			id: 3,
			firstName: "Said",
			lastName: "Bers",
			email: "freedeenn@gmail.com",
			isAdmin: false,
		},
		{
			id: 4,
			firstName: "Said",
			lastName: "Bers",
			email: "freedeenn@gmail.com",
			isAdmin: false,
		},
		{
			id: 5,
			firstName: "Said",
			lastName: "Bers",
			email: "freedeenn@gmail.com",
			isAdmin: false,
		},
		{
			id: 6,
			firstName: "Said",
			lastName: "Bers",
			email: "freedeenn@gmail.com",
			isAdmin: false,
		},
		{
			id: 7,
			firstName: "Said",
			lastName: "Bers",
			email: "freedeenn@gmail.com",
			isAdmin: false,
		},
	]);
	return (
		<div>
			<Header />
			<Button text="Home" onClick={onClick} />
			<Button text="Profil" onClick={onClick} />
			<Button text="Utilisateurs" onClick={onClick} />
			<Button text="Notification" onClick={onClick} />
			<Users users={users} />
		</div>
	);
};

export default Home;
