'use client'
import {useGetMeQuery, useLogoutMutation} from "@/store/services/auth/auth";
import Link from "next/link";

export const Header = () => {

    const {data, isLoading, error} = useGetMeQuery();

    return <div>
        <Link href={'/'}>LOGO</Link>... Menu items
        <Link href={'/posts'}>Posts</Link>
        <div>
            {isLoading ? <span>...</span> : data
                ? <span>Hello user {data.userId} <Logout/> </span>
                : <Link href={'/login'}>Login</Link>}
        </div>
        {/*<div>*/}
        {/*    {isLoading || !data ? <Link href={'/login'}>Login</Link>*/}
        {/*        : <span>Hello user {data.userId} <Logout/> </span>*/}
        {/*       }*/}
        {/*</div>*/}
    </div>
}


const Logout = () => {
    const [logout] = useLogoutMutation();
    return <div>
        <button onClick={() => {
            logout();
        }}>Logout
        </button>
    </div>;
}