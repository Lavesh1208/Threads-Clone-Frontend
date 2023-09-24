import { Flex, Image, Link, useColorMode } from "@chakra-ui/react";
import { AiFillHome } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import { Link as RouterLink } from "react-router-dom";
import { UserResponse } from "../types/userTypes";

interface HeaderProps {
	userInfo: UserResponse;
}

const Header: React.FC<HeaderProps> = ({ userInfo }) => {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<Flex justifyContent={"space-between"} mt={6} mb={12}>
			<Link as={RouterLink} to={"/"}>
				<AiFillHome size={30} />
			</Link>
			<Image
				cursor={"pointer"}
				w={6}
				src={colorMode === "dark" ? "/light-logo.svg" : "/dark-logo.svg"}
				onClick={toggleColorMode}
			/>
			<Link as={RouterLink} to={`/${userInfo?.username}`}>
				<RxAvatar size={30} />
			</Link>
		</Flex>
	);
};

export default Header;
