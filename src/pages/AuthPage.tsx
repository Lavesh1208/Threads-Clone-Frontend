import LoginCard from "../components/LoginCard";
import SignupCard from "../components/SignupCard";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const AuthPage = () => {
	const { authState } = useSelector((state: RootState) => state.auth);
	return <>{authState === "login" ? <LoginCard /> : <SignupCard />}</>;
};

export default AuthPage;
