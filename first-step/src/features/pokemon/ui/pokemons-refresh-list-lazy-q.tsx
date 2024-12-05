'use client'
import Link from "next/link";
import {useAppSelector, useAppStore} from "@/store/store";
import {useEffect, useRef, useState} from "react";
import {freshPokemonApi, useGetPokemonsQuery, useLazyGetPokemonsQuery} from "@/features/pokemon/fresh-slice";
import {pokemonApi} from "@/features/pokemon/slice";

export const PokemonsFreshListLazy = ({pokemons}: any) => {
    console.log("PokemonList rendering...!!!")
    console.log(new Date().toISOString())
    const store = useAppStore()

    const initialOffset = 0
    const [offset, setOffset] = useState(initialOffset)
    console.log('offset!!',offset)
    function next() {
        setOffset(prev => prev + 10)
    }

    const needInitPokemonsInStore = useRef(!!pokemons)

    console.log('pokemons: ', pokemons)
    console.log('needInitPokemonsInStore: ', needInitPokemonsInStore)

    if (needInitPokemonsInStore.current) {
        needInitPokemonsInStore.current = false
        store.dispatch(
            freshPokemonApi.util.upsertQueryData('getPokemons', 0, pokemons)
        );
        console.log('pokemons upserted to store')
    }

    // Using a query hook automatically fetches data and returns query values
    const result = useLazyGetPokemonsQuery()
    console.log('result',result)
    const [trigger, { data, isLoading, error }] = result

    useEffect(() => {
        if(offset !== initialOffset) {
            trigger(offset)
        }
    }, [offset]);

    useEffect(() => {
        return () => {
            console.log('unmount')
            store.dispatch(
             freshPokemonApi.util.resetApiState()
            )
        }
    }, [])

    console.log("data: ", data)
    console.log("isLoading: ", isLoading)
    // Individual hooks are also accessible under the generated endpoints:
    // const { data, error, isLoading } = pokemonApi.endpoints.getPokemonByName.useQuery('bulbasaur')

    const dataForRender = data || pokemons;

    return (
        <div className="App">
            {error && (
                <>Oh no, there was an error</>
            ) }
            { isLoading && !dataForRender &&
                <>Loading...</>
            }
            { dataForRender &&
                <div> <ul>{dataForRender.map((pokemon: any, index: number) => {
                        return <li key={pokemon.name}><Link  href={'/pokemons/' + pokemon.name}>
                            {index + 1} - {pokemon.name}
                        </Link>
                        </li>

                    }
                )} </ul>
                    <button onClick={next}>NEXT</button>
                </div>
            }
        </div>
    )
}