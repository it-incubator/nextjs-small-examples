'use client'
import {useGetMeQuery, useLoginMutation} from "@/store/services/instagram-users";
import {FormEvent} from "react";
import {saveAccessToken} from "@/shared/api/client";

export default function LoginPage() {

    const {data, isLoading, isError, error} = useGetMeQuery({});
    const [trigger, {}] = useLoginMutation({});

    let onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await trigger({
                password: 'Qwerty1A@',
                email: 'shotster0@gmail.com'
            }).unwrap()
        } catch (error) {
            console.log(error);
        }


    };
    return (
        <div className={""}>
            { !data &&
            <form onSubmit={onSubmit}>
                <input/>
                <hr/>
                <input/>
                <hr/>
                <button>LOGIN</button>
            </form>
            }
            <hr/>
            isLoading: {isLoading.toString()},
            <hr/>
            isError: {isError.toString()}
            <hr/>
            {isError && JSON.stringify(error)}
            <hr/>
            {data && JSON.stringify(data, null, 2)}
        </div>
    );
}
