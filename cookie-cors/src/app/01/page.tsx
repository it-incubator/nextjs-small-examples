'use client'
export default function Home() {

    const login = async () => {
        await fetch('https://it-incubator.xxx/api/01/auth/login', {method: 'POST'});
        alert('server returned set-cookie header in response')
    }

    const me = async () => {
        const response = await fetch('https://it-incubator.xxx/api/01/auth/me', {
            credentials: 'include'
        });
        const data = await response.json();
        alert(data.message)
    }
    const messages = async () => {
        const response = await fetch('https://it-incubator.xxx/api/01/messages', {
            credentials: 'include'
        });
        const data = await response.json();
        alert(data.message)
    }

    const getMeFromAPI = async () => {
        const response = await fetch('https://api.it-incubator.xxx/api/01/auth/me', {
            credentials: 'include',
        });
        const data = await response.json();
        alert(data.message)
    }
    const getMyMessagesFromAUTH = async () => {
        const response = await fetch('https://auth.it-incubator.xxx/api/01/messages', {
            credentials: 'include',
        });
        const data = await response.json();
        alert(data.message)
    }
    const overrideCookieViaSubdomain = async () => {
        const response = await fetch('https://api.it-incubator.xxx/api/01/subdomain-login', {
            method: 'POST',
            credentials: 'include',
        });
        const data = await response.json();
        alert(data.message)
    }

    return <div>
        <h2>We are on it-incubator.xxx</h2>
        <div>
            <h3>To it-incubator.xxx</h3>
            <button onClick={login}>Login</button>
            <button onClick={me}>Me</button>
            <button onClick={messages}>Messages</button>
            <hr/>
        </div>
        <div>
            <h3>To api.it-incubator.xxx</h3>
            <button onClick={getMeFromAPI}>GetMe api.it-incubator.xxx</button>
            <button onClick={overrideCookieViaSubdomain}>OverrideCookieViaSubdomain api.it-incubator.xxx</button>
            <hr/>
        </div>
        <div>
            <h3>hacker.xxx</h3>
            <button onClick={getMyMessagesFromAUTH}>GetMyMessagesFrom it-incubator.xxx</button>
            <hr/>
        </div>


    </div>
}
