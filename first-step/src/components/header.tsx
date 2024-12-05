'use client'
import {useGetMeQuery} from "@/features/auth/authSlice";
import Link from "next/link";

export const Header = () => {
    console.log("Header rendering")
        // Using a query hook automatically fetches data and returns query values
        const { data, error, isLoading } = useGetMeQuery()

        console.log("data: ", data)
        console.log("error: ", error)
        console.log("isLoading: ", isLoading)

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
                    <li>
                        <Link href={'/public-pokemons'} prefetch={false}>public pokemons</Link>
                    </li>
                    <div>
                        {data && 'user authorized: ' + data.userId}
                    </div>
                </ul>
                <hr/>
            </header>
        )
}