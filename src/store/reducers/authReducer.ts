import { createSlice } from "@reduxjs/toolkit";

interface authState {
	authState: string;
}

const userInitialState: authState = { authState: "login" };

const authSlice = createSlice({
	name: "auth",
	initialState: userInitialState,
	reducers: {
		setAuthState: (state, action) => {
			state.authState = action.payload;
		},
	},
});

const authActions = authSlice.actions;
const authReducer = authSlice.reducer;

export { authActions, authReducer };
