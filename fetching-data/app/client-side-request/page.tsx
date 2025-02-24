'use client'

import {Loader, PrettyDate} from '@/shared/components';
import {fetchDate} from '@/shared/utils';
import {useEffect, useState} from 'react'

/**
 * Fetching data on client-side as usual in SPA. You can replace local state with global one (RTK with RTK-query, for instance, or etc.)
 */
export default function ClientSideRequest() {
    console.log("ClientSideRequest rendering")
    const [message] = useState<string>('hello')
    const [dateTime, setDateTime] = useState<string | null>(null)

    useEffect(() => {
        console.log("ClientSideRequest useEffect")
        fetchDate().then((dateTime) => {
            setDateTime(dateTime)
        })
    }, [])

    if (!dateTime) return <div>
        Loader returned by Server {message}
        <Loader/>
    </div>

    return <PrettyDate date={dateTime}/>
}
