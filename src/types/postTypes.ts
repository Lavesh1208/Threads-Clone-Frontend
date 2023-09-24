import { UserResponse } from "./userTypes";

export interface PostReply {
	_id: string;
	text: string;
	userId: string;
	userProfilePic: string;
	username: string;
}

export interface PostResponse {
	_id: string;
	text: string;
	img: string;
	likes: string[];
	replies: PostReply[];
	postedBy: UserResponse;
	createdAt: string;
	updatedAt: string;
}

export interface PostInput {
	text: string;
	img: string | null;
	token: string;
}

export interface UpdatePostInput {
	text?: string;
	img?: string;
	postId?: string;
	token: string;
}

export interface ReplyToPostResponse {
	post: PostResponse;
	message: string;
}

export interface LikeUnlikePostResponse {
	message: string;
	isLiked: boolean;
}
