import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import {
	PostInput,
	PostResponse,
	LikeUnlikePostResponse,
	ReplyToPostResponse,
	UpdatePostInput,
} from "../../types/postTypes";

export const postApi = createApi({
	reducerPath: "postApi",
	baseQuery: fetchBaseQuery({
		baseUrl: `${import.meta.env.VITE_BACKEND_URL}/posts`,
		credentials: "include",
	}),
	tagTypes: ["Posts", "UserPosts"],
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
			invalidatesTags: ["Posts", "UserPosts"],
		}),
		getFeedPosts: builder.query<PostResponse[], string>({
			query: (token) => ({
				url: "/feed",
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
			providesTags: ["Posts"],
		}),
		replytoPost: builder.mutation<ReplyToPostResponse, UpdatePostInput>({
			query: (body) => ({
				url: `/reply/${body.postId}`,
				method: "POST",
				body: body,
				headers: {
					Authorization: `Bearer ${body.token}`,
				},
			}),
			invalidatesTags: ["Posts", "UserPosts"],
		}),
		likeUnlikePost: builder.mutation<LikeUnlikePostResponse, UpdatePostInput>({
			query: (body) => ({
				url: `/like/${body.postId}`,
				method: "PUT",
				headers: {
					Authorization: `Bearer ${body.token}`,
				},
			}),
			invalidatesTags: ["Posts"],
		}),
		getUserPosts: builder.query<PostResponse[], string>({
			query: (username) => ({
				url: `/user/${username}`,
				method: "GET",
			}),
			providesTags: ["UserPosts"],
		}),
		deletePost: builder.mutation<string, { postId: string; token: string }>({
			query: ({ postId, token }) => ({
				url: `/${postId}`,
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
			invalidatesTags: ["Posts", "UserPosts"],
		}),
		getPost: builder.query<PostResponse, string>({
			query: (postId) => ({
				url: `/${postId}`,
				method: "GET",
			}),
			providesTags: ["Posts"],
		}),
	}),
});

export const {
	useCreatePostMutation,
	useGetFeedPostsQuery,
	useLikeUnlikePostMutation,
	useReplytoPostMutation,
	useGetUserPostsQuery,
	useDeletePostMutation,
	useGetPostQuery,
} = postApi;
