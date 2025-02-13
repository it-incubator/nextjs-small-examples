'use client'

import {useGetPokemonByNameQuery} from "@/store/services/pokemon";
import {useRequireMeWithAnonymRedirect} from "@/hooks/useRequireMeWithAnonymRedirect";

export default function LoginPage() {
    const meData = useRequireMeWithAnonymRedirect()

    const { data, error, isLoading } = useGetPokemonByNameQuery('bulbasaur', {
        skip: !meData,
    })
    // Individual hooks are also accessible under the generated endpoints:
    // const { data, error, isLoading } = pokemonApi.endpoints.getPokemonByName.useQuery('bulbasaur')

    if (!meData) {
        return <span>...</span>
    }

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

            <hr/>
            userid: {meData?.userId}
        </div>
    )
}
