'use client'

import {useGetPokemonByNameQuery} from "@/store/services/pokemon";
import {useRequireMeWithAnonymRedirect} from "@/hooks/useRequireMeWithAnonymRedirect";
import {useGetMeQuery} from "@/store/services/auth/auth";

export default function PostsPage() {
    const meData = useRequireMeWithAnonymRedirect()

    const { data, error, isLoading, isFetching } = useGetPokemonByNameQuery('bulbasaur', {
        skip: !meData,
    })
    // Individual hooks are also accessible under the generated endpoints:
    // const { data, error, isLoading } = pokemonApi.endpoints.getPokemonByName.useQuery('bulbasaur')

    if (!meData) {
        return <span>...</span> // or skeleton or loader
    }

    // if (isLoading) {
    //     return <span>...</span> // or skeleton or loader
    // }



    return (
        <div className="App">
            { error && <>Oh no, there was an error</> }
            { isLoading && <>Pokemons Loading...</> }
            { data &&  <>
                <h3>{data.species.name} {isFetching && '⚙️' }</h3>
                <img src={data.sprites.front_shiny} alt={data.species.name} />
            </> }

            <hr/>
            userid: {meData?.userId}
        </div>
    )
}
