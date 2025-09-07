'use client'

import {useState} from "react";

export const ClientWrapper =  ({children}: any) => {
    debugger;
    const [message] = useState('from client wrapper')

    return <div>
        {/* нельзя: <ServerComponent/>*/}
        <h1>message</h1>
        {children}
    </div>
}