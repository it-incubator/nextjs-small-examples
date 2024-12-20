'use client'
export const LoginAndMe01 = () => {
    const login = async () => {
         await fetch('http://it-incubator.xxx/api/01/auth/login', {method: 'POST'});
         alert('server returned set-cookie header in response')
    }

    const me = async () => {
        const response = await fetch('http://it-incubator.xxx/api/01/auth/me');
        const data = await response.json();
        alert(data.message)
    }

    return <div>
        <button onClick={login}>Login</button>
        <button onClick={me}>Me</button>
    </div>
}