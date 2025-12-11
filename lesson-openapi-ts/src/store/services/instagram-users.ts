// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {client} from "@/common/api/client";
import {components} from "@/common/api/schema";


// type AddPost = paths['/api/v1/posts']['post']['requestBody']['content']['application/json']
type AddPost = components['schemas']['CreatePostInputDto']

export const mapResponse = async <T, E>(request: Promise<{data: T} | {error: E}>) => {
    const response = await request
    if ('data' in response) {
        return {data: response.data};
    } else {
        return {error: response.error}
    }
}


// Define a service using a base URL and expected endpoints
export const instagramApi = createApi({
    reducerPath: 'instagramApi',
    baseQuery: fetchBaseQuery({ baseUrl: '' }),
    endpoints: (builder) => ({
        getTotalUsers: builder.query({
            queryFn: async () => mapResponse(client.GET('/api/v1/public-user'))
        }),

        getUserPosts: builder.query({
            queryFn: async (_arg) => mapResponse(client.GET('/api/v1/posts/user/{userId}/{endCursorPostId}', {
                    params: {
                        path: {
                            userId: _arg.userId,
                            endCursorPostId: 0
                        }
                    }
                }))
        }),
        addPost: builder.mutation({
            queryFn: async (postPayload: AddPost ) => mapResponse(client.POST("/api/v1/posts", {
                    params: {},
                    body: postPayload
                }))
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetTotalUsersQuery, useGetUserPostsQuery, useAddPostMutation } = instagramApi