import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import {
	UpdateUserInput,
	UserInput,
	UserResponse,
} from "../../types/userTypes";

export const userApi = createApi({
	reducerPath: "userApi",
	baseQuery: fetchBaseQuery({
		baseUrl: `${import.meta.env.VITE_BACKEND_URL}/users`,
		credentials: "include",
	}),
	tagTypes: ["User"],
	endpoints: (builder) => ({
		signup: builder.mutation<UserResponse, UserInput>({
			query: (body) => ({
				url: "/signup",
				method: "POST",
				body,
			}),
			invalidatesTags: ["User"],
		}),
		login: builder.mutation<UserResponse, Partial<UserInput>>({
			query: (body) => ({
				url: "/login",
				method: "POST",
				body,
			}),
			invalidatesTags: ["User"],
		}),
		updateUser: builder.mutation<UserResponse, UpdateUserInput>({
			query: ({ body, _id, token }) => ({
				url: `/update/${_id}`,
				method: "PUT",
				body,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
			invalidatesTags: ["User"],
		}),
		followUnFollow: builder.mutation<
			{ message: string; following: boolean },
			Partial<UpdateUserInput>
		>({
			query: ({ _id, token }) => ({
				url: `/follow/${_id}`,
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
			invalidatesTags: ["User"],
		}),
		getUser: builder.query<UserResponse, string>({
			query: (username) => ({
				url: `/profile/${username}`,
				method: "GET",
			}),
			providesTags: ["User"],
		}),
	}),
});

export const {
	useSignupMutation,
	useLoginMutation,
	useUpdateUserMutation,
	useGetUserQuery,
	useFollowUnFollowMutation,
} = userApi;
