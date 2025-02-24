'use client'

import {useEffect, useState} from "react";

export function MSWProvider({children}: any) {
    const [ready, setReady] = useState(false)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            import('../mocks/browser').then(({ worker }) => worker.start().then(() => setReady(true)));
            }
    }, []);
    if (!ready) return <>...</>
    return <>{
        children
    }</>
}