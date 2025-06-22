'use client'
import Link from "next/link";
import {useAppStore} from "@/store/store";
import {useEffect, useRef, useState} from "react";
import {freshPokemonApi, useGetPokemonsQuery} from "@/features/pokemon/fresh-slice";

export const PokemonsFreshList = ({pokemons}: any) => {
    console.log("PokemonList rendering...")
    const store = useAppStore()
    const [offset, setOffset] = useState(0)
    // Using a query hook automatically fetches data and returns query values

    const needInitPokemonsInStore = useRef(!!pokemons)
    // or get data with selector like in other example

    const {data, error, isLoading} = useGetPokemonsQuery(offset, {
        skip: needInitPokemonsInStore.current
    })

    useEffect(() => {
        if (needInitPokemonsInStore.current) {
            store.dispatch(
                //@ts-ignore
                freshPokemonApi.util.upsertQueryData('getPokemons', 0, pokemons)
            );
            console.log('pokemons upserted to store')
            needInitPokemonsInStore.current = false;
        }
    }, [])

    function next() {
        setOffset(prev => prev + 10)
    }

    useEffect(() => {
        return () => {
            console.log('unmount')
            store.dispatch(
             freshPokemonApi.util.resetApiState()
            )

            // попробовать эту версию
            // store.dispatch(
            //     freshPokemonApi.internalActions.removeQueryResult({
            //         endpointName: 'getPokemons',
            //         queryCacheKey: entry.queryCacheKey,
            //     })
            // )

                //  а может заапсертить пустой массив,?    freshPokemonApi.util.upsertQueryData('getPokemons', 0, [])
            // или использовать keepUnusedDataFor
        }
    }, [])

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