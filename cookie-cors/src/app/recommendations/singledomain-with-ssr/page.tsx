import React from "react";
import Client from "./client";
import {headers} from "next/headers";

export default async function Home() {
    const baseUrl = 'https://it-incubator.xxx/api/singledomain-with-ssr'

    const getMessages = async (athorizationHeaderValue: string) => {
        const response = await fetch(baseUrl + '/messages', {
            headers: {
                "Authorization": athorizationHeaderValue
            }
        });

        if (response.status >= 200 && response.status < 300) {
            return response.json()
        }
    }

    let messages: null | string[] = null
    const headersObject = await headers()
    if (headersObject.has('Authorization')) {
        messages = await getMessages(headersObject.get("Authorization"))
    }
    return <ul>
        {messages === null ? <li>NOT AUTHORIZED</li> : messages.map(m => <li key={m.id}>{m.content}</li>)}
        <Client/>
    </ul>
}
