import {
	Avatar,
	Box,
	Button,
	Flex,
	Link,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Portal,
	Text,
	VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BsInstagram } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";
import { Link as RouterLink } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
import { useFollowUnFollowMutation } from "../store/api/userApi";
import { CustomeErrorType, UserResponse } from "../types/userTypes";

interface UserHeaderProps {
	user: UserResponse;
	currentUser: UserResponse | null;
	refetch: () => void;
}

const UserHeader: React.FC<UserHeaderProps> = ({
	user,
	refetch,
	currentUser,
}) => {
	const [folloUnFollowUser, { data, error, isSuccess }] =
		useFollowUnFollowMutation();
	const showToast = useShowToast();
	const [updating, setUpdating] = useState(false);
	const [following, setFollowing] = useState<boolean | undefined>(
		user.followers.includes(currentUser?._id || "")
	);
	const copyURL = () => {
		const currentUrl = window.location.href;
		navigator.clipboard.writeText(currentUrl).then(() => {
			showToast("Success", "Copied to clipboard", "success");
		});
	};

	const handleFollowUnfollow = async () => {
		setUpdating(true);
		await folloUnFollowUser({
			_id: user._id,
			token: currentUser?.token,
		});
		setUpdating(false);
		await refetch();
	};

	useEffect(() => {
		if (error) {
			const errorMessage = (error as CustomeErrorType).data?.message;
			showToast("Error", errorMessage, "error");
		} else if (isSuccess && data) {
			showToast("Success", data.message, "success");
			setFollowing(data.following);
		}
	}, [error, isSuccess, data, showToast]);

	return (
		<VStack gap={4} alignItems={"start"}>
			<Flex justifyContent={"space-between"} w={"full"}>
				<Box>
					<Text fontSize={"2xl"} fontWeight={"bold"}>
						{user.name}
					</Text>
					<Flex gap={2} alignItems={"center"}>
						<Text fontSize={"sm"}>{user.username}</Text>
						<Text
							fontSize={"xs"}
							bg={"gray.dark"}
							color={"gray.light"}
							p={1}
							borderRadius={"full"}
						>
							threads.net
						</Text>
					</Flex>
				</Box>
				<Box>
					{user.profilePic ? (
						<Avatar
							name={user.name}
							src={user.profilePic}
							size={{
								base: "md",
								md: "xl",
							}}
						/>
					) : (
						<Avatar
							name={user.name}
							src="https://bit.ly/broken-link"
							size={{
								base: "md",
								md: "xl",
							}}
						/>
					)}
				</Box>
			</Flex>

			<Text>{user.bio}</Text>

			{currentUser?._id === user._id && (
				<Link as={RouterLink} to="/update">
					<Button size={"sm"}>Update Profile</Button>
				</Link>
			)}
			{currentUser?._id !== user._id && (
				<Button size={"sm"} onClick={handleFollowUnfollow} isLoading={updating}>
					{following ? "Unfollow" : "Follow"}
				</Button>
			)}
			<Flex w={"full"} justifyContent={"space-between"}>
				<Flex gap={2} alignItems={"center"}>
					<Text color={"gray.light"}>{user.followers.length} followers</Text>
					<Box w="1" h="1" bg={"gray.light"} borderRadius={"full"}></Box>
					<Link color={"gray.light"}>instagram.com</Link>
				</Flex>
				<Flex>
					<Box className="icon-container">
						<BsInstagram size={24} cursor={"pointer"} />
					</Box>
					<Box className="icon-container">
						<Menu>
							<MenuButton>
								<CgMoreO size={24} cursor={"pointer"} />
							</MenuButton>
							<Portal>
								<MenuList bg={"gray.dark"}>
									<MenuItem bg={"gray.dark"} onClick={copyURL}>
										Copy link
									</MenuItem>
								</MenuList>
							</Portal>
						</Menu>
					</Box>
				</Flex>
			</Flex>

			<Flex w={"full"}>
				<Flex
					flex={1}
					borderBottom={"1.5px solid white"}
					justifyContent={"center"}
					pb="3"
					cursor={"pointer"}
				>
					<Text fontWeight={"bold"}> Threads</Text>
				</Flex>
				<Flex
					flex={1}
					borderBottom={"1px solid gray"}
					justifyContent={"center"}
					color={"gray.light"}
					pb="3"
					cursor={"pointer"}
				>
					<Text fontWeight={"bold"}> Replies</Text>
				</Flex>
			</Flex>
		</VStack>
	);
};

export default UserHeader;
