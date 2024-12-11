'use client'
import {pokemonApi, useGetPokemonsQuery} from "@/features/pokemon/slice";
import Link from "next/link";
import {useAppSelector, useAppStore} from "@/store/store";
import {useEffect, useRef, useState} from "react";

// задача, чтобы сервер вернул нам уже отрендеренный список, чтобы клиент не делал повторный запрос, но чтобы в редаксе был данный стейт,
// чтобы можно было делать инфинити скроллинг и подгружать следюущие страницы уже через клиент

export const PokemonsList = (props: any) => {
    console.log("PokemonList rendering...")
    const store = useAppStore()

    // нам это нужно, чтобы при возврате на страницу (а страница ведь размонтировалось и локальный стейт исчез)
    // вернуть состояние offset для локальноо стейта, благодаря тому, что rtk query хранит аргументы, с которыми
    //  был вызван квериХук
    const {data: dataFromCache, originalArgs} = useAppSelector((state) =>
        pokemonApi.endpoints.getPokemons.select()(state)
    )

    const [offset, setOffset] = useState(originalArgs || 0)

    console.log('offset!!', offset)

    function next() {
        setOffset(prev => prev + 10)
    }

    const needInitPokemonsInStore = !!props.pokemons && !dataFromCache

    // этот useEffect должен быть вызван перед useGetPokemonsQuery, чтобы эффект из useEffect был выполнен раньше чем тот, который внутри useQuery
    useEffect(() => {
        console.log('needInitPokemonsInStore: ', needInitPokemonsInStore)
        if (needInitPokemonsInStore)
            // мы диспатчим не экшен, а санку, поэтому измнения синзронно сразу не  попадут в редьюсеры,
            // поэтому после этого кода сразу ниже
            // const { data, error, isLoading } = useGetPokemonsQuery(offset)
            // у нас ещё не будет данных
            store.dispatch(
                pokemonApi.util.upsertQueryData('getPokemons', 0, props.pokemons)
            );
        console.log('pokemons upserted to store')
    }, [needInitPokemonsInStore])


    // Using a query hook automatically fetches data and returns query values
    const {data, error, isLoading} = useGetPokemonsQuery(offset, {
        skip: needInitPokemonsInStore
    })

    console.log('originalArgs', originalArgs)
    console.log('pokemons: ', props.pokemons)
    console.log("data: ", data)
    // Individual hooks are also accessible under the generated endpoints:
    // const { data, error, isLoading } = pokemonApi.endpoints.getPokemonByName.useQuery('bulbasaur')

    const dataForRender = data || props.pokemons;

    return (
        <div className="App">
            {error && (
                <>Oh no, there was an error</>
            )}
            {isLoading && !dataForRender &&
                <>Loading...</>
            }
            {dataForRender &&
                <div>
                    <ul>{dataForRender.map((pokemon: any, index: number) => {
                            return <li key={pokemon.name}><Link href={'/pokemons/' + pokemon.name}>
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