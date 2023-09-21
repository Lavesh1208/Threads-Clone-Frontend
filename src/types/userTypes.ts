export interface UserInput {
	name: string;
	username: string;
	email: string;
	password: string;
}

export interface UserResponse extends UserInput {
	_id: string;
	profilePic: string;
	token: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface CustomeErrorType {
	data: {
		message: string;
		error: string;
		statusCode: number;
	};
	status: number;
}
