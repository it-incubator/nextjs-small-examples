'use client'

import {useNotificationsQuery, useRoomMessagesQuery, useServerTimeQuery} from "@/store/services/time.api";

export default function Time() {
    const {data, isLoading} = useServerTimeQuery();
    const {data: dataNotifications, isLoading: isNotificationsLoading} = useNotificationsQuery();
    const {data: roomMessages} = useRoomMessagesQuery('secrets');

    if (isLoading) {
        return <span>...</span>
    }

    return (<div>
            <div className="App">
                time: {data?.time}
            </div>
            <hr/>
            <h3>Notifications</h3>
            <div>
                {
                    dataNotifications?.notifications.map((n, i) => <div key={i}>{n.message}</div>)
                }
            </div>
            <hr />

            <div>
                <h3>Room messages</h3>
                <ul>
                    {roomMessages?.messages.map((msg, idx) => (
                        <li key={idx}>{msg}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
