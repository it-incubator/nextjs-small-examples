'use client'

import {useServerTimeQuery} from "@/store/services/time.api";

export default function PostsPage() {
    const { data, error, isLoading } = useServerTimeQuery(undefined, {
        refetchOnMountOrArgChange: false,
        pollingInterval: 0,
    })

    if (isLoading) {
        return <span>...</span>
    }

    console.log(data)

    return (
        <div className="App">
           time: {data.time}
        </div>
    )
}
