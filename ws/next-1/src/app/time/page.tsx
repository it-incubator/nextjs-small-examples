'use client'

import {useServerTimeQuery} from "@/store/services/time.api";
import Time from "@/components/time";

export default function PostsPage() {
    const { data, error, isLoading } = useServerTimeQuery();

    if (isLoading) {
        return <span>...</span>
    }

    console.log(data)

    return (
        <div className="App">
           time: {data?.time}
            <hr />
            <Time />
        </div>
    )
}
