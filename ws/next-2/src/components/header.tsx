'use client'
import {useLogoutMutation} from "@/store/services/auth/auth";
import Link from "next/link";

export const Header = () => {
    return <div>
        <Link href={'/'}>LOGO</Link> - <Link href={'/time'}>Time</Link>
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