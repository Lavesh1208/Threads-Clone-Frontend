export interface UserInput {
	name: string;
	username: string;
	email: string;
	password: string;
}

export interface UserResponse extends UserInput {
	_id: string;
	profilePic: string;
	bio: string;
	token: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface UpdateUserInput {
	_id: string;
	token: string;
	body: Partial<UserInput>;
}

export interface CustomeErrorType {
	data: {
		message: string;
		error: string;
		statusCode: number;
	};
	status: number;
}
