'use client'
export default function Home() {

    const login = async () => {
        await fetch('https://it-incubator.xxx/api/01/auth/login', {method: 'POST'});
        alert('server returned set-cookie header in response')
    }

    const me = async () => {
        const response = await fetch('https://it-incubator.xxx/api/01/auth/me');
        const data = await response.json();
        alert(data.message)
    }

    const getMyMessagesFromAPI = async () => {
        const response = await fetch('https://api.it-incubator.xxx/api/01/messages', {
            credentials: 'include',
        });
        const data = await response.json();
        alert(data.message)
    }

    return <div>
        <button onClick={login}>Login</button>
        <button onClick={me}>Me</button>
        <button onClick={getMyMessagesFromAPI}>GetMyMessagesFrom api.it-incubator.xxx</button>
    </div>
}
