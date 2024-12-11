'use client'
import {useParams} from 'next/navigation';
import {useGetPokemonByNameQuery} from '@/features/pokemon/slice';
import Link from 'next/link';

export default function PokemonsPage() {
  const params = useParams()
  const pokemonId = params['pokemon-id']

  const {data, error, isLoading} = useGetPokemonByNameQuery(pokemonId as string)
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
              <Link href={'/pokemons/' + data.species.name}>
                <h3>{data.species.name}</h3>
              </Link>
              <img src={data.sprites.front_shiny} alt={data.species.name} width={'200px'}/>
            </>
        ) : null}
      </div>
  )
}
