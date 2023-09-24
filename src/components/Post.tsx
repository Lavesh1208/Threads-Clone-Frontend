import { Avatar, Box, Flex, Image, Text } from "@chakra-ui/react";
import { formatDistanceToNow } from "date-fns";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PostResponse } from "../types/postTypes";
import Actions from "./Actions";
import { DeleteIcon } from "@chakra-ui/icons";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import { useDeletePostMutation } from "../store/api/postApi";
import useShowToast from "../hooks/useShowToast";
import { CustomeErrorType } from "../types/userTypes";

interface PostProps {
	post: PostResponse;
}

const Post: React.FC<PostProps> = ({ post }) => {
	const navigate = useNavigate();
	const { userInfo } = useSelector((state: RootState) => state.user);
	const [deletePost, { data, error }] = useDeletePostMutation();
	const showToast = useShowToast();

	const handleDeletePost = async (
		e: React.MouseEvent<SVGElement, MouseEvent>
	) => {
		e.preventDefault();
		if (userInfo) {
			if (!window.confirm("Are you sure you want to delete this post?")) return;
			await deletePost({
				postId: post._id,
				token: userInfo.token,
			});
		}
	};

	useEffect(() => {
		if (error) {
			const errorMessage = (error as CustomeErrorType).data?.message;
			showToast("Error", errorMessage, "error");
		} else if (data) {
			showToast("Success", "Post deleted successfully", "success");
		}
	}, [error, data, showToast]);

	return (
		<Link to={`/${post.postedBy.username}/post/${post._id}`}>
			<Flex gap={3} mb={4} py={5}>
				<Flex flexDirection={"column"} alignItems={"center"}>
					<Avatar
						size="md"
						name={post.postedBy.name}
						src={post.postedBy.profilePic}
						onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
							e.preventDefault();
							navigate(`/${post.postedBy.username}`);
						}}
					/>
					<Box w="1px" h={"full"} bg="gray.light" my={2}></Box>
					<Box position={"relative"} w={"full"}>
						{post.replies.length === 0 && <Text align={"center"}>🥱</Text>}
						{post.replies[0] && (
							<Avatar
								size="xs"
								name={post.replies[0].username}
								src={post.replies[0].userProfilePic}
								position={"absolute"}
								top={"0px"}
								left="15px"
								padding={"2px"}
							/>
						)}
						{post.replies[1] && (
							<Avatar
								size="xs"
								name={post.replies[1].username}
								src={post.replies[1].userProfilePic}
								position={"absolute"}
								top={"0px"}
								left="15px"
								padding={"2px"}
							/>
						)}
						{post.replies[2] && (
							<Avatar
								size="xs"
								name={post.replies[2].username}
								src={post.replies[2].userProfilePic}
								position={"absolute"}
								top={"0px"}
								left="15px"
								padding={"2px"}
							/>
						)}
					</Box>
				</Flex>
				<Flex flex={1} flexDirection={"column"} gap={2}>
					<Flex justifyContent={"space-between"} w={"full"}>
						<Flex w={"full"} alignItems={"center"}>
							<Text fontSize={"sm"} fontWeight={"bold"}>
								{post.postedBy.username}
							</Text>
							<Image src="/verified.png" w={4} h={4} ml={1} />
						</Flex>
						<Flex gap={4} alignItems={"center"}>
							<Text
								fontSize={"xs"}
								w={36}
								textAlign={"right"}
								color={"gray.light"}
							>
								{formatDistanceToNow(new Date(post.createdAt))}
							</Text>
							{userInfo && userInfo._id === post.postedBy._id && (
								<DeleteIcon
									boxSize={4}
									cursor={"pointer"}
									onClick={(e) => handleDeletePost(e)}
								/>
							)}
						</Flex>
					</Flex>

					<Text fontSize={"sm"}>{post.text}</Text>
					{post.img && (
						<Box
							borderRadius={6}
							overflow={"hidden"}
							border={"1px solid"}
							borderColor={"gray.light"}
						>
							<Image src={post.img} w={"full"} />
						</Box>
					)}

					<Flex gap={3} my={1}>
						<Actions post={post} />
					</Flex>
				</Flex>
			</Flex>
		</Link>
	);
};

export default Post;
