'use client'

import {Loader} from '@/shared/components';
import {useEffect, useState} from 'react'
import {fetchPokemon} from "@/shared/utils/fetchDate";
import {PokemonName} from "@/shared/components/PrettyDate/PrettyDate";

/**
 * Fetching data on client-side as usual in SPA. You can replace local state with global one (RTK with RTK-query, for instance, or etc.)
 */
export default function ClientSideRequest() {
    console.log("ClientSideRequest rendering")
    const [message] = useState<string>('hello')
    const [pokemon, setPokemon] = useState<any>(null)

    useEffect(() => {
        console.log("ClientSideRequest useEffect")
        fetchPokemon().then((pokemon) => {
            setPokemon(pokemon)
        })
    }, [])

    if (!pokemon) return <div>
        Loader returned by Server {message}
        <Loader/>
    </div>

    return <PokemonName pokemon={pokemon}/>
}
