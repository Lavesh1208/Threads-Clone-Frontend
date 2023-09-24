import { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
import { useNavigate, useParams } from "react-router-dom";
import { useGetUserQuery } from "../store/api/userApi";
import useShowToast from "../hooks/useShowToast";
import { CustomeErrorType, UserResponse } from "../types/userTypes";
import { Flex, Spinner } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useGetUserPostsQuery } from "../store/api/postApi";
import Post from "../components/Post";

const UserPage = () => {
	const [user, setUser] = useState<UserResponse | null>(null);
	const [fetchingPosts, setFetchingPosts] = useState(true);
	const { username } = useParams();
	const showToast = useShowToast();
	const navigate = useNavigate();
	const currentUser = useSelector((state: RootState) => state.user.userInfo);
	const { data, isSuccess, error, refetch, isLoading } = useGetUserQuery(
		username!
	);

	const { data: posts, error: postsError } = useGetUserPostsQuery(username!);

	useEffect(() => {
		if (error) {
			const errorMessage = (error as CustomeErrorType).data?.message;
			showToast("Error", errorMessage, "error");
			navigate("/");
		} else if (isSuccess && data) {
			setUser(data);
		}
	}, [error, isSuccess, data, showToast, navigate]);

	useEffect(() => {
		if (postsError) {
			const postsErrorMessage = (postsError as CustomeErrorType).data?.message;
			showToast("Error", postsErrorMessage, "error");
		} else if (posts) {
			setFetchingPosts(false);
		}
	}, [postsError, showToast, posts]);

	if (!user && isLoading) {
		return (
			<Flex justify={"center"}>
				<Spinner size="xl" />
			</Flex>
		);
	}

	if (!user && !isLoading) {
		return <h1>User not found</h1>;
	}

	return (
		<div>
			{user && (
				<UserHeader user={user} currentUser={currentUser} refetch={refetch} />
			)}

			{fetchingPosts && (
				<Flex justify={"center"} my={12}>
					<Spinner size="xl" />
				</Flex>
			)}

			{!fetchingPosts && posts && posts.length === 0 && (
				<div>
					<h1>User has no posts.</h1>
				</div>
			)}

			{posts && posts.map((post) => <Post key={post._id} post={post} />)}
		</div>
	);
};

export default UserPage;
