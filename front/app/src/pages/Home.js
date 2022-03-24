import NavBar from "../components/NavBar";
import Post from "../components/Post";
import Footer from "../components/Footer";
import Log from "./Log";

const Home = () => {
	const loggedIn = localStorage.getItem("loggedIn");
	//AFFICHAGE//
	return (
		<>
			<NavBar />
			{loggedIn ? (
				<>
					<Post />
					<Footer />
				</>
			) : (
				<Log />
			)}
		</>
	);
};

export default Home;
