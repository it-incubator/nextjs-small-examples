'use client'
import {pokemonApi, useGetPokemonsQuery} from "@/features/pokemon/slice";
import Link from "next/link";
import {useAppStore} from "@/store/store";
import {useRef, useState} from "react";

export const PokemonsList = ({pokemons}: any) => {
    const store = useAppStore()
    const [offset, setOffset] = useState(0)

    function next() {
        setOffset(prev => prev + 10)
    }

    const needInitPokemonsInStore = useRef(!!pokemons)

    console.log('pokemons: ', pokemons)
    console.log('needInitPokemonsInStore: ', needInitPokemonsInStore)

    console.log(needInitPokemonsInStore.current)

    if (needInitPokemonsInStore.current) {
        store.dispatch(
            pokemonApi.util.upsertQueryData('getPokemons', 0, pokemons)
        );
        console.log('pokemons upserted to store')
        needInitPokemonsInStore.current = false;
        console.log(needInitPokemonsInStore.current)
    }

        // Using a query hook automatically fetches data and returns query values
        const { data, error, isLoading } = useGetPokemonsQuery(offset)

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