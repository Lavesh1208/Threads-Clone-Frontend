import { AddIcon } from "@chakra-ui/icons";
import {
	Button,
	CloseButton,
	Flex,
	FormControl,
	Image,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	Textarea,
	useColorModeValue,
	useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { BsFillImageFill } from "react-icons/bs";
import usePreviewImg from "../hooks/usePreviewImg";
import useShowToast from "../hooks/useShowToast";
import { useCreatePostMutation } from "../store/api/postApi";
import { CustomeErrorType, UserResponse } from "../types/userTypes";

interface CreatePostProps {
	userInfo: UserResponse;
}

const MAX_CHAR = 500;

const CreatePost: React.FC<CreatePostProps> = ({ userInfo }) => {
	const [createPost, { data, error, isSuccess }] = useCreatePostMutation();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [postText, setPostText] = useState("");
	const { handleImageChange, imgUrl, setImgUrl } = usePreviewImg();
	const imageRef = useRef<HTMLInputElement | null>(null);
	const [remainingChar, setRemainingChar] = useState(MAX_CHAR);
	const showToast = useShowToast();
	const [loading, setLoading] = useState(false);

	const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const inputText = e.target.value;

		if (inputText.length > MAX_CHAR) {
			const truncatedText = inputText.slice(0, MAX_CHAR);
			setPostText(truncatedText);
			setRemainingChar(0);
		} else {
			setPostText(inputText);
			setRemainingChar(MAX_CHAR - inputText.length);
		}
	};

	const handleCreatePost = async () => {
		setLoading(true);
		const body = { text: postText, img: imgUrl, token: `${userInfo?.token}` };
		await createPost(body);
		setLoading(false);
		setPostText("");
		setImgUrl("");
	};

	useEffect(() => {
		if (error) {
			const errorMessage = (error as CustomeErrorType).data?.message;
			showToast("Error", errorMessage, "error");
		} else if (isSuccess && data) {
			showToast("Success", "Post created successfully", "success");
		}
	}, [error, isSuccess, data, showToast]);

	return (
		<>
			<Button
				position={"fixed"}
				bottom={10}
				right={5}
				bg={useColorModeValue("gray.300", "gray.dark")}
				onClick={onOpen}
				size={{ base: "sm", sm: "md" }}
			>
				<AddIcon />
			</Button>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />

				<ModalContent>
					<ModalHeader>Create Post</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<FormControl>
							<Textarea
								placeholder="Post content goes here.."
								onChange={handleTextChange}
								value={postText}
							/>
							<Text
								fontSize="xs"
								fontWeight="bold"
								textAlign={"right"}
								m={"1"}
								color={"gray.800"}
							>
								{remainingChar}/{MAX_CHAR}
							</Text>

							<Input
								type="file"
								hidden
								ref={imageRef}
								onChange={handleImageChange}
							/>

							<BsFillImageFill
								style={{ marginLeft: "5px", cursor: "pointer" }}
								size={16}
								onClick={() => imageRef.current?.click()}
							/>
						</FormControl>

						{imgUrl && (
							<Flex mt={5} w={"full"} position={"relative"}>
								<Image src={imgUrl} alt="Selected img" />
								<CloseButton
									onClick={() => {
										setImgUrl("");
									}}
									bg={"gray.800"}
									position={"absolute"}
									top={2}
									right={2}
								/>
							</Flex>
						)}
					</ModalBody>

					<ModalFooter>
						<Button
							colorScheme="blue"
							mr={3}
							onClick={handleCreatePost}
							isLoading={loading}
						>
							Post
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default CreatePost;
