export interface PostInput {
	text: string;
	img: string | null;
	token: string;
}

export interface PostResponse {
	_id: string;
	text: string;
	likes: number;
	replies: number;
	postedBy: string;
	createdAt: string;
	updatedAt: string;
}
