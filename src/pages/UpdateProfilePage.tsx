import {
	Avatar,
	Button,
	Center,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Stack,
	useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import userPreviewImg from "../hooks/usePreviewImg";
import { useUpdateUserMutation } from "../store/api/userApi";
import useShowToast from "../hooks/useShowToast";
import { CustomeErrorType } from "../types/userTypes";
import { userActions } from "../store/reducers/userReducer";

const UpdateProfilePage = () => {
	const [updateUser, { data, error, isSuccess }] = useUpdateUserMutation();
	const { userInfo } = useSelector((state: RootState) => state.user);
	const showToast = useShowToast();
	const dispatch = useDispatch();
	const [inputs, setInputs] = useState({
		name: userInfo?.name,
		username: userInfo?.username,
		email: userInfo?.email,
		bio: userInfo?.bio,
		password: "",
	});
	const fileRef = useRef<HTMLInputElement | null>(null);

	const { handleImgageChange, imgUrl, setImgUrl } = userPreviewImg();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const body = { ...inputs, profilePic: imgUrl };
		updateUser({ body, _id: `${userInfo?._id}`, token: `${userInfo?.token}` });
	};

	useEffect(() => {
		if (error) {
			const errorMessage = (error as CustomeErrorType).data?.message;
			showToast("Error", errorMessage, "error");
		} else if (isSuccess) {
			showToast("Success", "Account Updated successfully", "success");
			localStorage.setItem("user-threads", JSON.stringify(data));
			dispatch(userActions.setUserInfo(data));
			setImgUrl(null);
		}
	}, [error, isSuccess, data, dispatch, showToast, setImgUrl]);

	return (
		<form onSubmit={handleSubmit}>
			<Flex align={"center"} justify={"center"} my={6}>
				<Stack
					spacing={4}
					w={"full"}
					maxW={"md"}
					bg={useColorModeValue("white", "gray.dark")}
					rounded={"xl"}
					boxShadow={"lg"}
					p={6}
				>
					<Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
						User Profile Edit
					</Heading>
					<FormControl id="userName">
						<FormLabel>User Icon</FormLabel>
						<Stack direction={["column", "row"]} spacing={6}>
							<Center>
								<Avatar size="xl" src={imgUrl || userInfo?.profilePic} />
							</Center>
							<Center w="full">
								<Button w="full" onClick={() => fileRef.current?.click()}>
									Change Avatar
								</Button>
								<Input
									type="file"
									hidden
									ref={fileRef}
									onChange={handleImgageChange}
								/>
							</Center>
						</Stack>
					</FormControl>
					<FormControl>
						<FormLabel>Full name</FormLabel>
						<Input
							placeholder="Full name"
							_placeholder={{ color: "gray.500" }}
							type="text"
							value={inputs.name}
							onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
						/>
					</FormControl>
					<FormControl>
						<FormLabel>User name</FormLabel>
						<Input
							placeholder="User name"
							_placeholder={{ color: "gray.500" }}
							type="text"
							value={inputs.username}
							onChange={(e) =>
								setInputs({ ...inputs, username: e.target.value })
							}
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Email Address</FormLabel>
						<Input
							placeholder="your-email@example.com"
							_placeholder={{ color: "gray.500" }}
							type="email"
							value={inputs.email}
							onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Bio</FormLabel>
						<Input
							placeholder="Your bio"
							_placeholder={{ color: "gray.500" }}
							type="text"
							value={inputs.bio}
							onChange={(e) => setInputs({ ...inputs, bio: e.target.value })}
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Password</FormLabel>
						<Input
							placeholder="password"
							_placeholder={{ color: "gray.500" }}
							type="password"
							value={inputs.password}
							onChange={(e) =>
								setInputs({ ...inputs, password: e.target.value })
							}
						/>
					</FormControl>
					<Stack spacing={6} direction={["column", "row"]}>
						<Button
							bg={"red.400"}
							color={"white"}
							w="full"
							_hover={{
								bg: "red.500",
							}}
						>
							Cancel
						</Button>
						<Button
							bg={"green.400"}
							color={"white"}
							w="full"
							_hover={{
								bg: "green.500",
							}}
							type="submit"
						>
							Submit
						</Button>
					</Stack>
				</Stack>
			</Flex>
		</form>
	);
};

export default UpdateProfilePage;
