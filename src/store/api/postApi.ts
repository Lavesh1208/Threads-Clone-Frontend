import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { PostInput, PostResponse } from "../../types/postTypes";

export const postApi = createApi({
	reducerPath: "postApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://127.0.0.1:5000/api/posts",
		credentials: "include",
	}),
	tagTypes: ["Posts"],
	endpoints: (builder) => ({
		createPost: builder.mutation<PostResponse, PostInput>({
			query: (body) => ({
				url: "/create",
				method: "POST",
				body,
				headers: {
					Authorization: `Bearer ${body.token}`,
				},
			}),
			invalidatesTags: ["Posts"],
		}),
	}),
});

export const { useCreatePostMutation } = postApi;
