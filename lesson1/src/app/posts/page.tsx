'use client'

import {useGetPokemonByNameQuery} from "@/store/services/pokemon";

export default function LoginPage() {
    const { data, error, isLoading } = useGetPokemonByNameQuery('bulbasaur')
    // Individual hooks are also accessible under the generated endpoints:
    // const { data, error, isLoading } = pokemonApi.endpoints.getPokemonByName.useQuery('bulbasaur')

    return (
        <div className="App">
            {error ? (
                <>Oh no, there was an error</>
            ) : isLoading ? (
                <>Loading...</>
            ) : data ? (
                <>
                    <h3>{data.species.name}</h3>
                    <img src={data.sprites.front_shiny} alt={data.species.name} />
                </>
            ) : null}
        </div>
    )
}
