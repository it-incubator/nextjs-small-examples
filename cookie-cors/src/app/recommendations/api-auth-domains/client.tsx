'use client'
import {useState} from "react";

export default function Client() {
    const [requestResult, setRequestResult] = useState("")
    const baseAuthUrl = 'https://auth.it-incubator.xxx/api/api-auth-domains'
    const baseApiUrl = 'https://api.it-incubator.xxx/api/api-auth-domains'


    const login = async () => {
        const response = await fetch(baseAuthUrl + '/auth/login', {
            method: 'POST',
            credentials: 'include' // need for dev mode
        });
        if (response.status >= 200 && response.status < 300) {
            setRequestResult('login successfully')
        }
    }

    const refresh = async () => {
        const response = await fetch(baseAuthUrl + '/auth/refresh', {
            method: 'POST',
            credentials: 'include' // need for dev mode
        });
        if (response.status >= 200 && response.status < 300) {
            setRequestResult('refresh successfully')
        }
    }

    const messages = async () => {
        const response = await fetch(baseApiUrl + '/messages', {
            credentials: 'include' // need for dev mode
        });

        if (response.status >= 200 && response.status < 300) {
            setRequestResult('messages successfully')
        }
    }

    return <div>
        <h2>Open page via it-incubator.xxx or dev.it-incubator.xxx</h2>
        <div>
            <h3>To the same domain it-incubator.xxx</h3>
            <button onClick={login}>Login</button>
            <button onClick={refresh}>Refresh</button>
            <button onClick={messages}>Messages</button>
            <hr/>
        </div>
        <div>
            {requestResult}
        </div>
    </div>
}
