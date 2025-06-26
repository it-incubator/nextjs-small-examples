// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {client} from "@/common/api/client";
import {paths, components} from "@/common/api/schema";


// type AddPost = paths['/api/v1/posts']['post']['requestBody']['content']['application/json']
type AddPost = components['schemas']['CreatePostInputDto']

// Define a service using a base URL and expected endpoints
export const instagramApi = createApi({
    reducerPath: 'instagramApi',
    baseQuery: fetchBaseQuery({ baseUrl: '' }),
    endpoints: (builder) => ({
        getTotalUsers: builder.query({
            queryFn: async () => {
                let data = await client.GET('/api/v1/public-user');
                return {data: data.data};
            }
        }),

        getUserPosts: builder.query({
            queryFn: async (_arg) => {
                let data = await client.GET('/api/v1/posts/user/{userId}/{endCursorPostId}', {
                    params: {
                        path: {
                            userId: _arg.userId,
                            endCursorPostId: '' as any as number
                        }
                    }
                });
                return {data: data.data};
            }
        }),
        addPost: builder.mutation({
            queryFn: async (postPayload: AddPost ) => {
                const result = await client.POST("/api/v1/posts", {
                    params: {},
                    body: postPayload
                })

                return {data: result.data}
            },
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetTotalUsersQuery, useGetUserPostsQuery, useAddPostMutation } = instagramApi