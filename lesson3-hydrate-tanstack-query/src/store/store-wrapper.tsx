'use client'

import {ReactElement, ReactNode} from "react";
import {queryClient, store} from "@/store/store";
import {Provider} from "react-redux";
import {QueryClientProvider} from "@tanstack/react-query";


type ReactChild = ReactElement | undefined | null | ReactNode;

export const StoreWrapper = ({children}: { children: ReactChild }) => {
    return <Provider store={store}>
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    </Provider>
}