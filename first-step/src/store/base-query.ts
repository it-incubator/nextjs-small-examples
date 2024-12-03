import {RootState} from "@/store/store";
import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import type {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query'
import { Mutex } from 'async-mutex'
import {setToken} from "@/features/auth/authSlice";


const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api/',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.accessToken

        // If we have a token set in state, let's assume that we should be passing it.
        if (token) {
            headers.set('authorization', `Bearer ${token}`)
        }

        return headers
    },
})



// create a new mutex
const mutex = new Mutex()
export const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    // wait until the mutex is available without locking it
    await mutex.waitForUnlock()
    let result = await baseQuery(args, api, extraOptions)
    if (result.error && result.error.status === 401) {
        console.log('baseQueryWithReauth: NEED REAUTH')
        // checking whether the mutex is locked
        if (!mutex.isLocked()) {
            const release = await mutex.acquire()
            try {
                const refreshResult = await baseQuery(
                    {
                        url: 'auth/refresh',
                        method: 'POST',
                        body: {}, // Include the body if needed, e.g., { refreshToken: '...' }
                    },
                    api,
                    extraOptions
                )
                if (refreshResult.data) {

                    // @ts-ignore
                    api.dispatch(setToken({accessToken: refreshResult.data.accessToken}))
                    // retry the initial query
                    result = await baseQuery(args, api, extraOptions)
                } else {
                   // api.dispatch(loggedOut())
                }
            } finally {
                // release must be called once the mutex should be released again.
                release()
            }
        } else {
            // wait until the mutex is available without locking it
            await mutex.waitForUnlock()
            result = await baseQuery(args, api, extraOptions)
        }
    }
    return result
}