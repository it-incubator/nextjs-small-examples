'use client'

import {ReactElement, ReactNode} from "react";
import {store} from "@/store/store";
import {Provider} from "react-redux";

type ReactChild = ReactElement | undefined | null | ReactNode;

export const StoreWrapper = ({children}: {children: ReactChild}) => {
    return <Provider store={store}>
        {children}
    </Provider>
}