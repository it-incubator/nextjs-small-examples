'use client'
import {useGetMeQuery, useLogoutMutation} from "@/store/services/auth/auth";
import Link from "next/link";

export const Header = () => {

    const {data, isLoading} = useGetMeQuery();

    return <div>
        <Link href={'/'}>LOGO</Link>... Menu items
        <Link href={'/time'}>Time</Link>
        <div>
            {isLoading ? <span>...</span> : data
                ? <span>Hello user {data.userId} <Logout/> </span>
                : <Link href={'/login'}>Login</Link>}
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