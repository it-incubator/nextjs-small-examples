// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const freshRickAndMortyApi = createApi({
    reducerPath: 'freshRickAndMortyApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://rickandmortyapi.com/api/' }),
    endpoints: (builder) => ({
        getCharacter: builder.query<any[], {page: number, name: string | null}>({
            query: ({name, page}) => {
                return `character?page=${page}${name ? `&name=${name}`: ''}`
            },
            // Only have one cache entry because the arg always maps to one string
            serializeQueryArgs: ({endpointName}) => {
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
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg
            },
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetCharacterQuery, useLazyGetCharacterQuery } = freshRickAndMortyApi