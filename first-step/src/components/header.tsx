'use client'
import {useGetMeQuery} from "@/features/auth/authSlice";
import Link from "next/link";

export const Header = () => {
    console.log("Header rendering")
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
                        <Link href={'/server-page'}>server page</Link>
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
                    <li>
                        <Link href={'/public-pokemons/without-server-preloading'} prefetch={false}>public pokemons
                            without-server-preloading</Link>
                    </li>
                    <li>
                        <Link href={'/public-fresh-pokemons'} prefetch={false}>public fresh pokemons</Link>
                    </li>
                    <li>
                        <Link href={'/public-fresh-pokemons/without-server-preloading'} prefetch={false}>public fresh
                            pokemons
                            without-server-preloading</Link>
                    </li>
                    <li>
                        <Link href={'/public-fresh-pokemons-lazy-hook'} prefetch={false}>public fresh pokemons lazy
                            hook</Link>
                    </li>
                    <li>
                        <Link href={'/public-fresh-pokemons-lazy-hook/without-server-preloading'} prefetch={false}>public fresh pokemons lazy
                            hook without-server-preloading</Link>
                    </li>
                    <div>
                        {data && 'user authorized: ' + data.userId}
                    </div>
                </ul>
                <hr/>
            </header>
        )
}