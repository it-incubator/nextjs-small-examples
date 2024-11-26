'use client'
import React, {ReactElement, ReactNode} from "react";
import {Provider} from "react-redux";
import {initializeStore} from "@/store/store";

type ReactChild = ReactElement | undefined | null | ReactNode;



export const ReduxWrapper  = ({children}: {children: ReactChild}) => {
    const store = initializeStore()
    return <Provider store={store}>
        {children}
        </Provider>

}