'use client'
import {PokemonsList} from "@/features/pokemon/ui/pokemons-list";
import {useGetMeQuery} from "@/features/auth/authSlice";
import {useEffect} from "react";
import { useRouter } from 'next/navigation'

export default function PokemonsPage() {
    const router = useRouter()
    const { data, error, isLoading, isFetching } = useGetMeQuery()
    // const { data, error, isLoading, isFetching } = useGetMeQuery(undefined, { skip: true })

    useEffect(() => {
        console.log('data: ' + !!data)
        console.log('isFetching: ' + isFetching)
        if (!data && !isFetching) {
            // If user is not authorized, redirect to login page
            router.push('/auth/login')
        }
    }, [
        data, isFetching
    ])

  return (
    <div>
        <h2>Pokemon list</h2>
      <PokemonsList skip={false} />
    </div>
  );
}
