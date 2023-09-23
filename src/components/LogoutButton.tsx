import { Button } from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
import { authActions } from "../store/reducers/authReducer";
import { userActions } from "../store/reducers/userReducer";

const LogoutButton = () => {
	const dispatch = useDispatch();
	const showToast = useShowToast();
	const navigate = useNavigate();
	const handleLogout = () => {
		dispatch(userActions.resetUserInfo());
		navigate("/auth");
		localStorage.removeItem("user-threads");
		showToast("Success", "Logged out successfully", "success");
		dispatch(authActions.setAuthState("login"));
	};

	return (
		<Button
			position={"fixed"}
			top={"30px"}
			right={"30px"}
			size={"sm"}
			onClick={handleLogout}
		>
			<FiLogOut size={20} />
		</Button>
	);
};

export default LogoutButton;
