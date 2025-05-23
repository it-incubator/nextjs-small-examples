import { configureStore } from '@reduxjs/toolkit'
import {counterReducer} from "@/features/counter/counterSlice";
import {pokemonApi} from "@/features/pokemon/slice";
import {authAPI, authReducer} from "@/features/auth/authSlice";
import {TypedUseSelectorHook, useDispatch, useSelector, useStore} from "react-redux";
import {freshPokemonApi} from "@/features/pokemon/fresh-slice";
import {freshRickAndMortyApi} from "@/features/rick-and-morty/fresh-slice";

export const initializeStore = () => {
    console.log('STORE CREATED')
    const store = configureStore({
        reducer: {
            counter: counterReducer,
            auth: authReducer,
            [pokemonApi.reducerPath]: pokemonApi.reducer,
            [freshPokemonApi.reducerPath]: freshPokemonApi.reducer,
            [freshRickAndMortyApi.reducerPath]: freshRickAndMortyApi.reducer,
            [authAPI.reducerPath]: authAPI.reducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(pokemonApi.middleware, freshPokemonApi.middleware, freshRickAndMortyApi.middleware, authAPI.middleware),

    })
    return store;
}

type StoreType = ReturnType<typeof initializeStore>
export type RootState = StoreType['getState']
export type AppDispatch = StoreType['dispatch']

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore = () => useStore<StoreType>();