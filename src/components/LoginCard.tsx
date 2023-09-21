import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
	InputGroup,
	InputRightElement,
	Link,
	Stack,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../store/reducers/authReducer";
import { useLoginMutation } from "../store/api/userApi";
import { CustomeErrorType } from "../types/userTypes";
import useShowToast from "../hooks/useToastHook";
import { useNavigate } from "react-router-dom";
import { userActions } from "../store/reducers/userReducer";

const LoginCard = () => {
	const [loginUser, { data, error, isSuccess }] = useLoginMutation();
	const [showPassword, setShowPassword] = useState(false);
	const showToast = useShowToast();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [inputs, setInputs] = useState({
		username: "",
		password: "",
	});

	const handleLogin = async () => {
		await loginUser(inputs);
	};

	useEffect(() => {
		if (error) {
			const errorMessage = (error as CustomeErrorType).data?.message;
			showToast("Error", errorMessage, "error");
		} else if (isSuccess) {
			showToast("Success", "Logged in successfully", "success");
			dispatch(userActions.setUserInfo(data));
			localStorage.setItem("user-threads", JSON.stringify(data));
			navigate("/");
		}
	}, [error, isSuccess, data, showToast, navigate, dispatch]);

	return (
		<Flex align={"center"} justify={"center"}>
			<Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
				<Stack align={"center"}>
					<Heading fontSize={"4xl"} textAlign={"center"}>
						Login
					</Heading>
				</Stack>
				<Box
					rounded={"lg"}
					bg={useColorModeValue("white", "gray.dark")}
					boxShadow={"lg"}
					w={{
						base: "full",
						sm: "400px",
					}}
					p={8}
				>
					<Stack spacing={4}>
						<FormControl id="email" isRequired>
							<FormLabel>Username</FormLabel>
							<Input
								type="email"
								onChange={(e) =>
									setInputs({ ...inputs, username: e.target.value })
								}
							/>
						</FormControl>
						<FormControl id="password" isRequired>
							<FormLabel>Password</FormLabel>
							<InputGroup>
								<Input
									type={showPassword ? "text" : "password"}
									onChange={(e) => {
										setInputs({ ...inputs, password: e.target.value });
									}}
								/>
								<InputRightElement h={"full"}>
									<Button
										variant={"ghost"}
										onClick={() =>
											setShowPassword((showPassword) => !showPassword)
										}
									>
										{showPassword ? <ViewIcon /> : <ViewOffIcon />}
									</Button>
								</InputRightElement>
							</InputGroup>
						</FormControl>
						<Stack spacing={10} pt={2}>
							<Button
								loadingText="Submitting"
								size="lg"
								bg={useColorModeValue("gray.600", "gray.700")}
								color={"white"}
								_hover={{
									bg: useColorModeValue("gray.700", "gray.800"),
								}}
								onClick={handleLogin}
							>
								Login
							</Button>
						</Stack>
						<Stack pt={6}>
							<Text align={"center"}>
								Don't have an account?{" "}
								<Link
									color={"blue.400"}
									onClick={() => dispatch(authActions.setAuthState("signup"))}
								>
									Sign up
								</Link>
							</Text>
						</Stack>
					</Stack>
				</Box>
			</Stack>
		</Flex>
	);
};

export default LoginCard;
