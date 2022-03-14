import User from "./User";
import "../styles/User.css";

const Users = ({ users }) => {
	return (
		<div>
			{users.map((user) => (
				<User key={user.id} user={user}></User>
			))}
		</div>
	);
};

export default Users;
