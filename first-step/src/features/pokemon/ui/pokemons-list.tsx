'use client'
import {pokemonApi, useGetPokemonsQuery} from "@/features/pokemon/slice";
import Link from "next/link";
import {useAppStore} from "@/store/store";
import {useRef} from "react";

export const PokemonsList = ({pokemons}: any) => {

    const store = useAppStore()
    const initialized = useRef(!pokemons)

    console.log('pokemons: ', pokemons)
    console.log('initialized: ', initialized)

    if (!initialized.current) {
        store.dispatch(
            pokemonApi.util.upsertQueryData('getPokemons', null, pokemons)
        );
        initialized.current = true;
    }

        // Using a query hook automatically fetches data and returns query values
        const { data, error, isLoading } = useGetPokemonsQuery(null, {
            //skip: !!pokemons
        })

    console.log("data: ", data)
        // Individual hooks are also accessible under the generated endpoints:
        // const { data, error, isLoading } = pokemonApi.endpoints.getPokemonByName.useQuery('bulbasaur')

        return (
            <div className="App">
                {error ? (
                    <>Oh no, there was an error</>
                ) : isLoading ? (
                    <>Loading...</>
                ) : data ? <ul>{data.results.map((pokemon: any) => {
                            return <li key={pokemon.name}><Link  href={'/pokemons/' + pokemon.name}>
                           {pokemon.name}
                            </Link>
                            </li>

                        }
                )} </ul> : null}
            </div>
        )
}