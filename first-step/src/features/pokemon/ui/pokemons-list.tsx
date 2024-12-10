'use client'
import {useGetPokemonsQuery} from '@/features/pokemon/slice';
import Link from 'next/link';
import styles from './pokemons-list.module.css'

export const PokemonsList = () => {
  // Using a query hook automatically fetches data and returns query values
  const {data, error, isLoading} = useGetPokemonsQuery()
  // Individual hooks are also accessible under the generated endpoints:
  // const { data, error, isLoading } = pokemonApi.endpoints.getPokemonByName.useQuery('bulbasaur')

  return (
      <div className="App">
        {error ? (
            <>Oh no, there was an error</>
        ) : isLoading ? (
            <>Loading...</>
        ) : data ? (
            <div className={styles.list}>
              {data.results.map((pokemon: any) => (
                  <Link key={pokemon.name} href={'/pokemons/' + pokemon.name}>
                    {pokemon.name}
                  </Link>
              ))}
            </div>
            ) : null}
      </div>
  )
}