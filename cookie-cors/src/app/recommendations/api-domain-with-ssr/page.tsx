import React from "react";
import Client from "./client";
import {headers} from "next/headers";
import {baseUrl} from "@/app/recommendations/api-domain-with-ssr/constants";

export default async function Home() {
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
    console.log(headersObject);
    if (headersObject.has('Authorization')) {
        messages = await getMessages(headersObject.get("Authorization"))
    }
    return <ul>
        {messages === null ? <li>NOT AUTHORIZED</li> : messages.map(m => <li key={m.id}>{m.content}</li>)}
        <Client/>
    </ul>
}
