'use client'
import {useAppStore} from "@/store/store";
import React, {SyntheticEvent, useEffect, useRef, useState} from "react";
import {freshPokemonApi, useGetPokemonsQuery} from "@/features/pokemon/fresh-slice";
import {useRouter, useSearchParams} from "next/navigation";
import {useGetCharacterQuery} from "@/features/rick-and-morty/fresh-slice";

export const RickAndMortyFreshList = ({ list }: any) => {
    console.log('list', list)
    const searchParams = useSearchParams();
    const router = useRouter();
    const store = useAppStore()
    const [page, setPage] = useState(1)
    const [searchName, setSearchName] = useState(searchParams.get('name') || '');
    // Using a query hook automatically fetches data and returns query values
    const requestArgs = {page: page, name: searchParams.get('name')}

    const needInitPokemonsInStore = useRef(!!list)
    // or get data with selector like in other example

    const {data, error, isLoading} = useGetCharacterQuery(requestArgs, {
        skip: needInitPokemonsInStore.current
    })

    useEffect(() => {
        if (needInitPokemonsInStore.current) {
            console.log('effect')
            store.dispatch(
                freshPokemonApi.util.upsertQueryData('getPokemons', requestArgs, list)
            );
            needInitPokemonsInStore.current = false;
        }
    }, [list])

    function next() {
        setPage(prev => prev + 1)
    }

    function onChange(event: React.ChangeEvent<HTMLInputElement>) {
        setSearchName(event.target.value)
    }

    function onKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
        if(event.key === 'Enter') {
            const params = new URLSearchParams(searchParams);
            if(!searchName) {
            params.delete('name');
            } else {
            params.set("name", searchName);
            }

            router.push(`?${params.toString()}`, { scroll: false });
        }
    }


    useEffect(() => {
        return () => {
            console.log('unmount')
            store.dispatch(
             freshPokemonApi.util.resetApiState()
            )
        }
    }, [])

    console.log("isLoading: ", isLoading)
    // Individual hooks are also accessible under the generated endpoints:
    // const { data, error, isLoading } = pokemonApi.endpoints.getPokemonByName.useQuery('bulbasaur')

    const dataForRender = data || list;

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
                        return <li key={pokemon.id}>
                            {index + 1} - {pokemon.name}
                        </li>

                    }
                )} </ul>
                    <button onClick={next}>NEXT</button>
                    <input onChange={onChange} onKeyDown={onKeyPress} value={searchName}/>
                    filter values="rick" or "morty"
                </div>
            }
        </div>
    )
}