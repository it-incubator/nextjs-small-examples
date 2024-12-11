'use client'
import Link from "next/link";
import {useAppStore} from "@/store/store";
import {useEffect, useRef, useState} from "react";
import {freshPokemonApi, useLazyGetPokemonsQuery} from "@/features/pokemon/fresh-slice";

export const PokemonsFreshListLazy = ({pokemons}: any) => {
    console.log("PokemonList rendering...!!!")
    console.log(new Date().toISOString())
    const store = useAppStore()

    const ZERO_OFFSET = 0
   // const [offset, setOffset] = useState(ZERO_OFFSET)
    function next() {
        const offset = originalArgs ??  ZERO_OFFSET
        trigger(offset + 10)
    }

    console.log('pokemons: ', pokemons)

    useEffect(() => {
        if (!!pokemons) {
            store.dispatch(
                freshPokemonApi.util.upsertQueryData('getPokemons', 0, pokemons)
            );
            console.log('pokemons upserted to store')
        } else {
            trigger(ZERO_OFFSET)
        }

        return () => {
            console.log('unmount')
            store.dispatch(
                freshPokemonApi.util.resetApiState()
            )
        }
    }, [])


    // Using a query hook automatically fetches data and returns query values
    const result = useLazyGetPokemonsQuery()
    console.log('result',result)
    const [trigger, { data, isLoading, error, originalArgs }] = result


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