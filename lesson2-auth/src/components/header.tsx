'use client'
import {useGetMeQuery, useLogoutMutation} from "@/store/services/auth/auth";
import Link from "next/link";

export const Header = () => {

    const {data, isLoading} = useGetMeQuery();

    return <div>
        <Link href={'/'}>LOGO</Link>... Menu items
        <Link href={'/posts'}>Posts</Link>
        <div>
            { isLoading && <span>...</span> }
            { !isLoading && data && <span>Hello user {data.userId} <Logout/> </span> }
            { !isLoading && !data && <Link href={'/login'}>Login</Link> }
        </div>
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