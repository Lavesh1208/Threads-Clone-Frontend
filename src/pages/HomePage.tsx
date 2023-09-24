import { Flex, Spinner } from "@chakra-ui/react";
import { useEffect } from "react";
import Post from "../components/Post";
import useShowToast from "../hooks/useShowToast";
import { useGetFeedPostsQuery } from "../store/api/postApi";
import { CustomeErrorType, UserResponse } from "../types/userTypes";

interface HomePageProps {
	userInfo: UserResponse;
}

const HomePage: React.FC<HomePageProps> = ({ userInfo }) => {
	const {
		data: feedPosts,
		error,

		isLoading,
	} = useGetFeedPostsQuery(userInfo.token);
	const showToast = useShowToast();

	useEffect(() => {
		if (error) {
			const errorMessage = (error as CustomeErrorType).data?.message;
			showToast("Error", errorMessage, "error");
		}
	}, [error, feedPosts, showToast]);

	if (isLoading) {
		return (
			<Flex justify={"center"}>
				<Spinner size="xl" />
			</Flex>
		);
	}

	return (
		<>
			{!isLoading && feedPosts?.length === 0 && (
				<h1>Follow some users to see the feed</h1>
			)}

			{feedPosts &&
				feedPosts.map((post) => <Post key={post._id} post={post} />)}
		</>
	);
};

export default HomePage;
