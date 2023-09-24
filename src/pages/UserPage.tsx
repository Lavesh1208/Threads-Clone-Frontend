import { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";
import { useNavigate, useParams } from "react-router-dom";
import { useGetUserQuery } from "../store/api/userApi";
import useShowToast from "../hooks/useShowToast";
import { CustomeErrorType, UserResponse } from "../types/userTypes";
import { Flex, Spinner } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const UserPage = () => {
	const [user, setUser] = useState<UserResponse | null>(null);
	const { username } = useParams();
	const showToast = useShowToast();
	const navigate = useNavigate();
	const currentUser = useSelector((state: RootState) => state.user.userInfo);
	const { data, isSuccess, error, refetch, isLoading } = useGetUserQuery(
		username!
	);

	useEffect(() => {
		if (error) {
			const errorMessage = (error as CustomeErrorType).data?.message;
			showToast("Error", errorMessage, "error");
			navigate("/");
		} else if (isSuccess && data) {
			setUser(data);
		}
	}, [error, isSuccess, data, showToast, navigate]);

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
			<UserPost
				likes={4893}
				replies={3837}
				postImg="/post1.png"
				postTitle="Let's talk about threads"
			/>
			<UserPost
				likes={678}
				replies={354}
				postImg="/post2.png"
				postTitle="Nice Tutorial"
			/>
			<UserPost
				likes={983}
				replies={735}
				postImg="/post3.png"
				postTitle="Nice Guy"
			/>
			<UserPost likes={65} replies={17} postTitle="This is my first thread." />
		</div>
	);
};

export default UserPage;
