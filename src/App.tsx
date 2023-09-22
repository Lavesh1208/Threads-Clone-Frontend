import { Container } from "@chakra-ui/react";
import { Navigate, Route, Routes } from "react-router-dom";
import UserPage from "./pages/UserPage";
import PostPage from "./pages/PostPage";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import LogoutButton from "./components/LogoutButton";
import UpdateProfilePage from "./pages/UpdateProfilePage";

function App() {
	const { userInfo } = useSelector((state: RootState) => state.user);
	return (
		<Container maxW="620px">
			<Header />
			<Routes>
				<Route
					index
					path="/"
					element={userInfo ? <HomePage /> : <Navigate to="/auth" />}
				/>
				<Route
					path="/auth"
					element={!userInfo ? <AuthPage /> : <Navigate to="/" />}
				/>
				<Route
					path="/update"
					element={userInfo ? <UpdateProfilePage /> : <Navigate to="/auth" />}
				/>
				<Route path="/:username" element={<UserPage />} />
				<Route path="/:username/post/:pid" element={<PostPage />} />
			</Routes>

			{userInfo && <LogoutButton />}
		</Container>
	);
}

export default App;
