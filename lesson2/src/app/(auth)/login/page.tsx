'use client'
import {FormEvent} from 'react';
import {useLoginMutation} from "@/store/services/auth/auth";
import {useRedirectIfAuthorized} from "@/hooks/useRedirectIfAuthorized";

export default function LoginPage() {
    const {isLoading} = useRedirectIfAuthorized();

    console.log('rendered')
    const [login, result] = useLoginMutation()

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const json: any = Object.fromEntries(formData.entries());
        login(json)
        // You can access form data here
        // Example: const login = formData.get('login');
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input name={'login'}/>
                <input name={'password'} type={'password'}/>
                <button>login</button>
            </form>
        </div>
    )
}
