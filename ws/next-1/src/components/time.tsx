'use client'

import {useNotificationsQuery, useServerTimeQuery} from "@/store/services/time.api";

export default function Time() {
    const {data, isLoading} = useServerTimeQuery();
    const {data: dataNotifications, isLoading: isNotificationsLoading} = useNotificationsQuery();

    if (isLoading) {
        return <span>...</span>
    }

    return (<div>
            <div className="App">
                time: {data?.time}
            </div>
            <hr/>
            <div>
                {
                    dataNotifications?.notifications.map((n, i) => <div key={i}>{n.message}</div>)
                }
            </div>
        </div>
    )
}
