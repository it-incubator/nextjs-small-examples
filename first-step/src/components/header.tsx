'use client'
import {useGetMeQuery} from "@/features/auth/authSlice";
import Link from "next/link";

export const Header = () => {
        // Using a query hook automatically fetches data and returns query values
        const { data, error, isLoading } = useGetMeQuery()

        return (
            <header>HEADER

                <ul>
                    <li>
                        <Link href={'/auth/login'}>LOGIN</Link>
                    </li>
                    <li>
                        <Link href={'/profile'}>profile</Link>
                    </li>
                    <li>
                        <Link href={'/auth/registration'} prefetch={false}>Registration</Link>
                    </li>
                    <li>
                        <Link href={'/auth/registration/confirmation?code=123342342122131'}
                              prefetch={false}>Confirmation</Link>
                    </li>
                    <li>
                        <Link href={'/pokemons'} prefetch={false}>pokemons</Link>
                    </li>
                    <div>
                        {data && 'user authorized: ' + data.userId}
                    </div>
                </ul>
                <hr/>
            </header>
        )
}