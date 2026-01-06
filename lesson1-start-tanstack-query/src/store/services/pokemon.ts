import {useQuery} from "@tanstack/react-query";

export type PokemonType = {
    species: {
        name: string
    }
    sprites: { front_shiny: string }
}

const fetchPokemonByName = async (name: string): Promise<PokemonType> => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    if (!response.ok) {
        throw new Error('Failed to fetch pokemon')
    }
    return response.json()
}

export const useGetPokemonByNameQuery = (name: string) => {
    return useQuery({
        queryKey: ['pokemon', name],
        queryFn: () => fetchPokemonByName(name),
    })
}
