import { Container } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import CreatePost from "./components/CreatePost";
import Header from "./components/Header";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import UserPage from "./pages/UserPage";
import { RootState } from "./store/store";

function App() {
	const { userInfo } = useSelector((state: RootState) => state.user);
	return (
		<Container maxW="620px">
			<Header userInfo={userInfo} />
			<Routes>
				<Route
					index
					path="/"
					element={
						userInfo ? (
							<HomePage userInfo={userInfo} />
						) : (
							<Navigate to="/auth" />
						)
					}
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

			{userInfo && <CreatePost userInfo={userInfo} />}
		</Container>
	);
}

export default App;
