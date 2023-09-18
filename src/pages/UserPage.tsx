import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";

const UserPage = () => {
	return (
		<div>
			<UserHeader />
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
