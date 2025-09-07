'use client'
import {FormEvent} from 'react';
import {useLoginMutation} from "@/store/services/auth/auth";
import {useRedirectIfAuthorized} from "@/hooks/useRedirectIfAuthorized";

export default function LoginPage() {
    const isLoading = useRedirectIfAuthorized();

    console.log('rendered')
    const [login, result] = useLoginMutation()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        debugger;
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const json: any = Object.fromEntries(formData.entries());
        const response = await login(json).unwrap()
        console.log(response)
        // You can access form data here
        // Example: const login = formData.get('login');
    }

    if (isLoading) {
        return <div>Loading...</div>
    } // возомжно и не делать такоую загрзку а показывать поьзователю логин.. через секунду его
    // всё равно отсюда редиректнет если он щалогинен

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
