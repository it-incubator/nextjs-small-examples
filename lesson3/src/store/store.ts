import { configureStore } from '@reduxjs/toolkit'
import { setupListeners} from '@reduxjs/toolkit/query'
import {coursesApi} from "@/store/services/coursesApi";
import {TypedUseSelectorHook, useDispatch, useSelector, useStore} from "react-redux";

export const store = configureStore({
    reducer: {
        [coursesApi.reducerPath]: coursesApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(coursesApi.middleware),
})

setupListeners(store.dispatch)

type StoreType = typeof store
export type RootState = ReturnType<StoreType['getState']>
export type AppDispatch = StoreType['dispatch']
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore = () => useStore<StoreType>();
export const useAppDispatch = () => useDispatch<AppDispatch>();