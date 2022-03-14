const User = ({ user }) => {
	return (
		<div>
			<h3 className="user">
				lastName: {user.lastName} <br /> firstName: {user.firstName}
			</h3>
		</div>
	);
};

export default User;
