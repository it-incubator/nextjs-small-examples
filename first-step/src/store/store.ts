import { configureStore } from '@reduxjs/toolkit'
import {counterReducer} from "@/features/counter/counterSlice";
import {pokemonApi} from "@/features/pokemon/slice";
import {authAPI, authReducer} from "@/features/auth/authSlice";




export const initializeStore = () => {
    console.log('STORE CREATED')
    const store = configureStore({
        reducer: {
            counter: counterReducer,
            auth: authReducer,
            [pokemonApi.reducerPath]: pokemonApi.reducer,
            [authAPI.reducerPath]: authAPI.reducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(pokemonApi.middleware, authAPI.middleware),

    })
    return store;
}

// Infer the `RootState` and `AppDispatch` types from the store itself
//export type RootState2 = ReturnType<typeof store.getState>
type StoreType = ReturnType<typeof initializeStore>
export type RootState = StoreType['getState']
export type AppDispatch = StoreType['dispatch']
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}