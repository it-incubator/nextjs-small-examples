'use client'
import Link from "next/link";
import {useAppStore} from "@/store/store";
import {useEffect, useRef, useState} from "react";
import {freshPokemonApi, useGetPokemonsQuery} from "@/features/pokemon/fresh-slice";

export const PokemonsFreshList = ({pokemons}: any) => {
    debugger;
    console.log("PokemonList rendering...")
    const store = useAppStore()

    const [offset, setOffset] = useState(0)
    console.log('offset!!',offset)
    function next() {
        setOffset(prev => prev + 10)
    }


    const needInitPokemonsInStore = useRef(!!pokemons)

    console.log('pokemons: ', pokemons)
    console.log('needInitPokemonsInStore: ', needInitPokemonsInStore)

    if (needInitPokemonsInStore.current) {
        store.dispatch(
            freshPokemonApi.util.upsertQueryData('getPokemons', 0, pokemons)
        );
        console.log('pokemons upserted to store')
        needInitPokemonsInStore.current = false
    }

    // Using a query hook automatically fetches data and returns query values
    const { data, error, isLoading } = useGetPokemonsQuery(offset)

    useEffect(() => {
        return () => {
            debugger;
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