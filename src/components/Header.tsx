import { Button, Flex, Image, Link, useColorMode } from "@chakra-ui/react";
import { AiFillHome } from "react-icons/ai";
import { BsFillChatQuoteFill } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { RxAvatar } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
import { authActions } from "../store/reducers/authReducer";
import { userActions } from "../store/reducers/userReducer";
import { UserResponse } from "../types/userTypes";

interface HeaderProps {
	userInfo: UserResponse | null;
}

const Header: React.FC<HeaderProps> = ({ userInfo }) => {
	const { colorMode, toggleColorMode } = useColorMode();
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
		<Flex justifyContent={"space-between"} mt={6} mb={12}>
			{userInfo && (
				<Link as={RouterLink} to="/">
					<AiFillHome size={24} />
				</Link>
			)}
			{!userInfo && (
				<Link
					as={RouterLink}
					to={"/login"}
					onClick={() => dispatch(authActions.setAuthState("login"))}
				>
					Login
				</Link>
			)}
			<Image
				cursor={"pointer"}
				w={6}
				src={colorMode === "dark" ? "/light-logo.svg" : "/dark-logo.svg"}
				onClick={toggleColorMode}
			/>
			{userInfo && (
				<Flex alignItems={"center"} gap={4}>
					<Link as={RouterLink} to={`/${userInfo.username}`}>
						<RxAvatar size={24} />
					</Link>
					<Link as={RouterLink} to={`/chat`}>
						<BsFillChatQuoteFill size={20} />
					</Link>
					<Button size={"xs"} onClick={handleLogout}>
						<FiLogOut size={20} />
					</Button>
				</Flex>
			)}

			{!userInfo && (
				<Link
					as={RouterLink}
					to={"/auth"}
					onClick={() => dispatch(authActions.setAuthState("signup"))}
				>
					Login
				</Link>
			)}
		</Flex>
	);
};

export default Header;
