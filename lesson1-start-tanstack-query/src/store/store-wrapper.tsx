'use client'

import {ReactElement, ReactNode, useState} from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

type ReactChild = ReactElement | undefined | null | ReactNode;

export const StoreWrapper = ({children}: {children: ReactChild}) => {
    const [queryClient] = useState(() => new QueryClient())

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}
