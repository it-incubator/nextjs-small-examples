// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const freshPokemonApi = createApi({
    reducerPath: 'freshPokemonApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
    endpoints: (builder) => ({
        getPokemonByName: builder.query<any, string>({
            query: (name) => `pokemon/${name}`,
        }),
        getPokemons: builder.query<any[], number>({
            query: (offset) => `pokemon?limit=${10}&offset=${offset}`,
            // Only have one cache entry because the arg always maps to one string
            serializeQueryArgs: ({endpointName}) => {
                return endpointName
            },
            transformResponse: (response: any, meta, arg) => {
                    console.log('transformResponse: ', response.results)
                    return response.results
            },
            // Always merge incoming data to the cache entry
            merge: (currentCache, newItems) => {
                currentCache.push(...newItems)
            },
            // Refetch when the page arg changes
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg
            },
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPokemonByNameQuery, useGetPokemonsQuery,useLazyGetPokemonsQuery } = freshPokemonApi