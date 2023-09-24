import {
	Avatar,
	Box,
	Button,
	Divider,
	Flex,
	Image,
	Spinner,
	Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import Actions from "../components/Actions";
import Comment from "../components/Comment";
import { useDeletePostMutation, useGetPostQuery } from "../store/api/postApi";
import { useNavigate, useParams } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
import { CustomeErrorType } from "../types/userTypes";
import { formatDistanceToNow } from "date-fns";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { DeleteIcon } from "@chakra-ui/icons";

const PostPage = () => {
	const { userInfo } = useSelector((state: RootState) => state.user);
	const { pid } = useParams();
	const [deletePost, { data: deleteData, error: deleteError }] =
		useDeletePostMutation();
	const { data: post, error: postError, isLoading } = useGetPostQuery(pid!);
	const showToast = useShowToast();
	const navigate = useNavigate();

	const handleDeletePost = async () => {
		if (userInfo && post) {
			if (!window.confirm("Are you sure you want to delete this post?")) return;
			await deletePost({
				postId: post._id,
				token: userInfo.token,
			});
		}
	};

	useEffect(() => {
		if (postError) {
			const errorMessage = (postError as CustomeErrorType).data?.message;
			showToast("Error", errorMessage, "error");
		} else if (post) {
			showToast("Success", "Post fetched successfully", "success");
		}
	}, [postError, post, showToast]);

	useEffect(() => {
		if (deleteError) {
			const errorMessage = (deleteError as CustomeErrorType).data?.message;
			showToast("Error", errorMessage, "error");
		} else if (deleteData && post) {
			showToast("Success", "Post deleted successfully", "success");
			navigate(`/${post.postedBy.username}`);
		}
	}, [deleteError, deleteData, showToast, navigate, post]);

	if (isLoading) {
		return (
			<Flex justify={"center"}>
				<Spinner size="xl" />
			</Flex>
		);
	}

	if (!post) {
		return null;
	}

	return (
		<>
			<Flex>
				<Flex w={"full"} alignItems={"center"} gap={3}>
					<Avatar
						src={post.postedBy.profilePic}
						size={"md"}
						name={post.postedBy.name}
					/>
					<Flex>
						<Text fontSize={"sm"} fontWeight={"bold"}>
							{post.postedBy.username}
						</Text>
						<Image src="/verified.png" w="4" h={4} ml={4} />
					</Flex>
				</Flex>
				<Flex gap={4} alignItems={"center"}>
					<Text fontSize={"xs"} w={36} textAlign={"right"} color={"gray.light"}>
						{formatDistanceToNow(new Date(post.createdAt))}
					</Text>
					{userInfo && userInfo._id === post.postedBy._id && (
						<DeleteIcon
							boxSize={4}
							cursor={"pointer"}
							onClick={handleDeletePost}
						/>
					)}
				</Flex>
			</Flex>

			<Text my={3}>Let's talk about threads</Text>

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

			<Flex gap={3} my={3}>
				<Actions post={post} />
			</Flex>

			<Divider my={4} />

			<Flex justifyContent={"space-between"}>
				<Flex gap={2} alignItems={"center"}>
					<Text fontSize={"2xl"}>👋</Text>
					<Text color={"gray.light"}>Get the app to like, reply and post.</Text>
				</Flex>
				<Button>Get</Button>
			</Flex>

			<Divider my={4} />
			{post.replies.map((reply) => (
				<Comment
					key={reply._id}
					reply={reply}
					lastReply={reply._id === post.replies[post.replies.length - 1]._id}
				/>
			))}
		</>
	);
};

export default PostPage;
