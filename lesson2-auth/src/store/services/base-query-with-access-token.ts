import {BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError} from "@reduxjs/toolkit/query/react";
import {Mutex} from "async-mutex";

export const baseQueryWithAccessToken = fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api',
    prepareHeaders: (headers, {getState}) => {
        // you can take accessToken from localStorage/sessionStorage
        const token = sessionStorage.getItem('access-token');

        // If we have a token set in state, let's assume that we should be passing it.
        if (token) {
            headers.set('authorization', `Bearer ${token}`)
        }

        return headers
    },
})

// as example for lessons
export const baseQueryWithReauthWithoutMutexAsExample: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result = await baseQueryWithAccessToken(args, api, extraOptions) // 🚀 main request, example /me or /messages

    if (result.error?.status === 401 ||
        (result.error?.status === 'PARSING_ERROR' && result.error?.originalStatus === 401) // ❌ 401 response, accessToken expired
    ) {
        try {
            const refreshResult = await baseQueryWithAccessToken( // 🌈 refresh tokens pair
                {
                    url: 'auth/refresh', method: 'POST', body: {}, // Include the body if needed, e.g., { refreshToken: '...' }
                },
                api,
                extraOptions
            )
            if (refreshResult.data) {
                sessionStorage.setItem('access-token', refreshResult.data.accessToken)
                result = await baseQueryWithAccessToken(args, api, extraOptions) // repeat 🚀 main request with fresh accesstoken
                return result; // ✅ success response
            } else {
                return result; // ❌ 401 response
            }
        } catch (error) {
            console.error(error)
            return result; // ❌ 401 response
        }
    }

    return result; // some of these answers ❌ 400 | 500 | 200 | 201 | 403
}


// create a new mutex
const mutex = new Mutex()
// for using
export const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    // wait until the mutex is available without locking it
    await mutex.waitForUnlock() // может кто-то уже в процессе получения новой пары токенов? я подожду await,
    // зачем мне делать заведомо not authorized запрос

    // 1
    let result = await baseQueryWithAccessToken(args, api, extraOptions) // 🚀 main request, example /me or /messages

    if (result.error?.status === 401 || result.error?.originalStatus === 401) {
        console.log('baseQueryWithReauth: NEED REAUTH: ' + args)
        // checking whether the mutex is locked
        if (mutex.isLocked()) {
            // wait until the mutex is available without locking it
            await mutex.waitForUnlock()
            return baseQueryWithAccessToken(args, api, extraOptions) // или ❌ или ✅
        }
        else {
            // пока я делал свой запрос, кто-то мог заблокировать mutex
            const release = await mutex.acquire() // 🔒 блокируем mutex
            try {
                const refreshResult = await baseQueryWithAccessToken(
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
                    sessionStorage.setItem('access-token', refreshResult.data.accessToken)
                    return await baseQueryWithAccessToken(args, api, extraOptions)
                } else {
                    // api.dispatch(loggedOut())
                    // posiible scenario if refresh токен тоже короткоживущий и вкладка долго открыта, то пользователь нажмёт
                    // кнопку, а у него протух и аккссее и рефреш, то в этом случае нужно явно его вылогинить (зачистить auth информацию в стейте)
                }
            } catch (error) {
                console.error(error)
            } finally {
                // release must be called once the mutex should be released again.
                release()
            }
        }
    }
    // 2
    return result
}

