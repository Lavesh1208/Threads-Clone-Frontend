import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { userApi } from "./api/userApi";
import { authReducer } from "./reducers/authReducer";
import { userReducer } from "./reducers/userReducer";

const userInfoFromStorage = localStorage.getItem("user-threads")
	? JSON.parse(localStorage.getItem("user-threads")!)
	: null;

const initialState = {
	user: { userInfo: userInfoFromStorage },
};

const store = configureStore({
	reducer: {
		auth: authReducer,
		user: userReducer,
		[userApi.reducerPath]: userApi.reducer,
	},
	preloadedState: initialState,
	middleware: (getDefault) => getDefault().concat([userApi.middleware]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export default store;
