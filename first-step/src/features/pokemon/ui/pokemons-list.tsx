'use client'
import {pokemonApi, useGetPokemonsQuery} from "@/features/pokemon/slice";
import Link from "next/link";
import {useAppSelector, useAppStore} from "@/store/store";
import {useState} from "react";

export const PokemonsList = ({pokemons}: any) => {
    console.log("PokemonList rendering...")
    const store = useAppStore()

    // нам это нужно, чтобы при возврате на страницу (а страница ведь размонтировалось и локальный стейт исчез)
    // вернуть состояние offset для локальноо стейта, благодаря тому, что rtk query хранит аргументы, с которыми
    //  был вызван квериХук
    const { originalArgs } = useAppSelector((state) =>
        pokemonApi.endpoints.getPokemons.select()(state)
    )

    const [offset, setOffset] = useState(originalArgs || 0)
    console.log('offset!!',offset)
    function next() {
        setOffset(prev => prev + 10)
    }

    // Using a query hook automatically fetches data and returns query values
    const { data, error, isLoading } = useGetPokemonsQuery(offset)
    const dataFromCache = data

    console.log('dataFromCache', dataFromCache)
    console.log('originalArgs', originalArgs)

    const needInitPokemonsInStore = !!pokemons && !dataFromCache

    console.log('pokemons: ', pokemons)
    console.log('needInitPokemonsInStore: ', needInitPokemonsInStore)

    if (needInitPokemonsInStore) {
        store.dispatch(
            pokemonApi.util.upsertQueryData('getPokemons', 0, pokemons)
        );
        console.log('pokemons upserted to store')
    }



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