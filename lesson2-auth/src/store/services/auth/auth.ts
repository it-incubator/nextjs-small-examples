import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQueryWithAccessToken, baseQueryWithReauth} from "@/store/services/base-query-with-access-token";


export const authAPI = createApi({
    reducerPath: 'authAPI',
    tagTypes: ['me'],
     baseQuery: baseQueryWithReauth,
    // baseQuery: baseQueryWithAccessToken,
    endpoints: (builder) => ({
        login: builder.mutation<{ accessToken: string }, {
            login: string,
            password: string
        }>({
            query: (body) => ({
                url: `/auth/login`,
                method: 'POST',
                body: body,
            }),
            async onQueryStarted(arg, {dispatch, queryFulfilled}) {
                try {
                    const response = await queryFulfilled; // Wait for the mutation to complete
                    // alternative option: set token to localAtorage
                    sessionStorage.setItem('access-token', response.data.accessToken)
                    await dispatch(authAPI.endpoints.getMe.initiate());
                } catch (error) {
                    console.error(error)
                    throw error
                }
            },
        }),
        getMe: builder.query<{ userId: number }, void>({
            query: () => `/auth/me`,
            providesTags: ['me']
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: `/auth/logout`,
                method: 'DELETE'
            }),
            async onQueryStarted(arg, {dispatch, queryFulfilled}) {
                const response = await queryFulfilled;
                sessionStorage.removeItem('access-token');
                //dispatch(authAPI.util.invalidateTags(['me'])); не работает, потому что он инвалидирует кеш.. делает
                // перезапрос, падает 401 ошибка и он возвращает прошлое значение
                // а вот resetApiState именно сбрасывает стейт
                await dispatch(authAPI.util.resetApiState());
            }
        }),
        getProfile: builder.query<{ profile: string, address: string }, void>({
            query: () => `/profile`,
            keepUnusedDataFor: 0
        }),
    }),
})

export const {useLoginMutation, useGetMeQuery, useLogoutMutation, useGetProfileQuery} = authAPI;