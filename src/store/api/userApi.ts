import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { UserInput, UserResponse } from "../../types/userTypes";

export const userApi = createApi({
	reducerPath: "userApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://127.0.0.1:5000/api",
		credentials: "include",
	}),
	tagTypes: ["User"],
	endpoints: (builder) => ({
		signup: builder.mutation<UserResponse, UserInput>({
			query: (body) => ({
				url: "/users/signup",
				method: "POST",
				body,
			}),
			invalidatesTags: ["User"],
		}),
		login: builder.mutation<UserResponse, Partial<UserInput>>({
			query: (body) => ({
				url: "/users/login",
				method: "POST",
				body,
			}),
			invalidatesTags: ["User"],
		}),
		// getUser: builder.query<IUser, string>({
		// 	query: (token) => ({
		// 		url: `/users/profile`,
		// 		method: "GET",
		// 		headers: {
		// 			Authorization: `Bearer ${token}`,
		// 		},
		// 	}),
		// 	providesTags: ["User"],
		// }),
	}),
});

export const { useSignupMutation, useLoginMutation } = userApi;
