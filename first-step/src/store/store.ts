import {configureStore} from '@reduxjs/toolkit'
import {counterReducer} from '@/features/counter/counterSlice';
import {pokemonApi} from '@/features/pokemon/slice';
import {authAPI, authReducer} from '@/features/auth/authSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    [authAPI.reducerPath]: authAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(pokemonApi.middleware, authAPI.middleware),

})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch