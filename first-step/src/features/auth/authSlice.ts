import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQueryWithReauth} from "@/store/base-query";

export interface AuthState {
    userId: number | null,
    accessToken: string | null
}

const initialState: AuthState = {
    userId: null,
    accessToken: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUserData: (state, action: PayloadAction<{ userId: number }>) => {
            state.userId = action.payload.userId
        },
        setToken: (state, action: PayloadAction<{ accessToken: string }>) => {
            state.accessToken = action.payload.accessToken
        },
    },
})

export const authAPI = createApi({
    reducerPath: 'authAPI',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        login: builder.mutation<{ accessToken: string }, { login: string, password: string }>({
            query: (body) => ({
                url: `auth/login`,
                method: 'POST',
                body: body,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled; // Wait for the mutation to complete
                    dispatch(setToken({accessToken: data.accessToken})); // Dispatch the token to your authSlice
                    await dispatch(authAPI.endpoints.getMe.initiate());
                } catch (error) {
                    console.error('Login failed:', error);
                }
            },
        }),
        getMe: builder.query<{ userId: number }, void>({
            query: () => `auth/me`,
        }),
        getProfile: builder.query<{ profile: string, address: string }, void>({
            query: () => `profile`,
            keepUnusedDataFor: 0
        }),
    }),
})

export const  {useLoginMutation, useGetMeQuery, useGetProfileQuery} = authAPI;


// Action creators are generated for each case reducer function
export const {setUserData, setToken} = authSlice.actions

export const authReducer = authSlice.reducer