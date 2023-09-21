import { createSlice } from "@reduxjs/toolkit";
import { UserResponse } from "../../types/userTypes";

interface IUserState {
	userInfo: UserResponse | null;
}

const userInitialState: IUserState = { userInfo: null };

const userSlice = createSlice({
	name: "user",
	initialState: userInitialState,
	reducers: {
		setUserInfo: (state, action) => {
			state.userInfo = action.payload;
		},
		resetUserInfo: (state) => {
			state.userInfo = null;
		},
	},
});

const userActions = userSlice.actions;
const userReducer = userSlice.reducer;

export { userActions, userReducer };
