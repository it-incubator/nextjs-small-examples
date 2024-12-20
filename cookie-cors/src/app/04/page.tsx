'use client'
export default function Home() {
    const login = async () => {
        await fetch('https://it-incubator.xxx/api/04/auth/login', {
            credentials: 'include',
            method: 'POST',

        });
        alert('server returned set-cookie header in response')
    }

    const getMyMessages = async () => {
        const response = await fetch('https://it-incubator.xxx/api/04/messages', {
            credentials: 'include',
        });
        const data = await response.json();
        alert(data.message)
    }

    const refreshToken = async () => {
        const response = await fetch('https://it-incubator.xxx/api/04/auth/refresh', {
            method: 'POST',
            credentials: 'include',
        });
        const data = await response.json();
        alert(data.message)
    }

    return <div>
        <button onClick={login}>Login</button>
        <button onClick={getMyMessages}>GetMyMessages</button>
        <button onClick={refreshToken}>RefreshToken</button>
    </div>
}