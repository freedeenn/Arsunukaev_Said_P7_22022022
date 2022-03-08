const User = ({ user }) => {
	return (
		<div>
			<h3 className="user">
				Nom: {user.lastName} <br /> Prénom: {user.firstName} <br /> email:{" "}
				{user.email} <br />
				{user.isAdmin}
			</h3>
		</div>
	);
};

export default User;
