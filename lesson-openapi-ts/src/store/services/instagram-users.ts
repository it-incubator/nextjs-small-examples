// Need to use the React-specific entry point to import createApi
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {client, saveAccessToken} from "@/shared/api/client";
import {SchemaCreatePostInputDto, SchemaLoginInputDto} from "@/shared/api/schema";




export const mapResponse = async <T, E>(request: Promise<{ data: T } | { error: E }>) => {
    const clientResponse = await request
    if ('data' in clientResponse) {
        return {data: clientResponse.data};
    }

    // @ts-ignore
    const rawResponseStatus = clientResponse.response.status;

    return {error: {status: rawResponseStatus, data: clientResponse.error}}

}


// Define a service using a base URL and expected endpoints
export const instagramApi = createApi({
    reducerPath: 'instagramApi',
    baseQuery: fetchBaseQuery({baseUrl: ''}),
    endpoints: (builder) => {
        return ({
            login: builder.mutation({
                queryFn: async (postPayload: SchemaLoginInputDto) =>
                    mapResponse(client.POST("/api/v1/auth/login", {
                        params: {},
                        body: postPayload,
                        credentials: 'include'
                    })),
                async onQueryStarted(arg, {dispatch, queryFulfilled}) {
                    try {
                        const response = await queryFulfilled; // Wait for the mutation to complete
                        saveAccessToken(response.data!.accessToken)
                        await dispatch(instagramApi.endpoints.getMe.initiate({}));
                       // await dispatch(instagramApi.util.resetApiState());
                    } catch (error) {

                    }
                },
            }),

            getMe: builder.query({
                queryFn: async () => mapResponse(client.GET('/api/v1/auth/me'))
            }),

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
                queryFn: async (postPayload: SchemaCreatePostInputDto) =>
                    mapResponse(client.POST("/api/v1/posts", {
                        params: {},
                        body: postPayload
                    }))
            }),
        });
    },
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useGetTotalUsersQuery, useGetUserPostsQuery, useAddPostMutation, useGetMeQuery,
useLoginMutation} = instagramApi