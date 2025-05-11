// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {log} from "node:util";

// Define a service using a base URL and expected endpoints
export const freshPokemonApi = createApi({
    reducerPath: 'freshPokemonApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
    keepUnusedDataFor: 9999999,
    endpoints: (builder) => ({
        getPokemonByName: builder.query<any, string>({
            query: (name) => `pokemon/${name}`,
        }),
        getPokemons: builder.query<any[], number>({
            query: (offset) => `pokemon?limit=${10}&offset=${offset}`,
            // Only have one cache entry because the arg always maps to one string
            serializeQueryArgs: ({endpointName}) => {
                // console.log('❤️ endpointName:' + endpointName); // ❤️ endpointName: getPokemons
                return endpointName
            },
            transformResponse: (response: any, meta, arg) => {
                    return response.results
            },
            // Always merge incoming data to the cache entry
            merge: (currentCache, newItems) => {
                currentCache.push(...newItems)
            },
            // Refetch when the page arg changes
            // так как у нас всё складывается по одному ключу (serializeQueryArgs) то даже если аргументы запроса меняются
            // rtk qery не делает запрос, ведь ключ тот же и  данные в кеше уже сидят.. и запрос не полетит...
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg
            },
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPokemonByNameQuery, useGetPokemonsQuery,useLazyGetPokemonsQuery } = freshPokemonApi