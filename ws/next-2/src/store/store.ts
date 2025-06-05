import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'
import {authAPI} from "@/store/services/auth/auth";
import {timeAPI} from "@/store/services/time.api";

export const store = configureStore({
    reducer: {
        // Add the generated reducer as a specific top-level slice
        [authAPI.reducerPath]: authAPI.reducer,
        [timeAPI.reducerPath]: timeAPI.reducer,
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(timeAPI.middleware, authAPI.middleware),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)