import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	Flex,
	FormControl,
	FormLabel,
	HStack,
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
import useShowToast from "../hooks/useToastHook";
import { useSignupMutation } from "../store/api/userApi";
import { authActions } from "../store/reducers/authReducer";
import { CustomeErrorType } from "../types/userTypes";
import { useNavigate } from "react-router-dom";

const SignupCard = () => {
	const [signupUser, { data, error, isSuccess }] = useSignupMutation();
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const showToast = useShowToast();
	const [inputs, setInputs] = useState({
		name: "",
		username: "",
		email: "",
		password: "",
	});

	const handleSignup = async () => {
		await signupUser(inputs);
	};

	useEffect(() => {
		if (error) {
			const errorMessage = (error as CustomeErrorType).data?.message;
			showToast("Error", errorMessage, "error");
		} else if (isSuccess) {
			showToast("Success", "Account created successfully", "success");
			localStorage.setItem("user-threads", JSON.stringify(data));
			navigate("/");
		}
	}, [error, isSuccess, data, dispatch, showToast, navigate]);

	return (
		<Flex align={"center"} justify={"center"}>
			<Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
				<Stack align={"center"}>
					<Heading fontSize={"4xl"} textAlign={"center"}>
						Sign up
					</Heading>
				</Stack>
				<Box
					rounded={"lg"}
					bg={useColorModeValue("white", "gray.dark")}
					boxShadow={"lg"}
					p={8}
				>
					<Stack spacing={4}>
						<HStack>
							<Box>
								<FormControl isRequired>
									<FormLabel>Full Name</FormLabel>
									<Input
										type="text"
										onChange={(e) =>
											setInputs({ ...inputs, name: e.target.value })
										}
										value={inputs.name}
									/>
								</FormControl>
							</Box>
							<Box>
								<FormControl isRequired>
									<FormLabel>Username</FormLabel>
									<Input
										type="text"
										onChange={(e) =>
											setInputs({ ...inputs, username: e.target.value })
										}
										value={inputs.username}
									/>
								</FormControl>
							</Box>
						</HStack>
						<FormControl id="email" isRequired>
							<FormLabel>Email address</FormLabel>
							<Input
								type="email"
								onChange={(e) =>
									setInputs({ ...inputs, email: e.target.value })
								}
								value={inputs.email}
							/>
						</FormControl>
						<FormControl id="password" isRequired>
							<FormLabel>Password</FormLabel>
							<InputGroup>
								<Input
									type={showPassword ? "text" : "password"}
									onChange={(e) =>
										setInputs({ ...inputs, password: e.target.value })
									}
									value={inputs.password}
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
								onClick={handleSignup}
							>
								Sign up
							</Button>
						</Stack>
						<Stack pt={6}>
							<Text align={"center"}>
								Already a user?{" "}
								<Link
									color={"blue.400"}
									onClick={() => dispatch(authActions.setAuthState("login"))}
								>
									Login
								</Link>
							</Text>
						</Stack>
					</Stack>
				</Box>
			</Stack>
		</Flex>
	);
};

export default SignupCard;
