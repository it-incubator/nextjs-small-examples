import {fetchPokemon} from "@/shared/utils/fetchDate";
import {PokemonName} from "@/shared/components/PrettyDate/PrettyDate";

export const PokemonFetcher = async () => {
  const pokemon = await fetchPokemon()

  return <PokemonName pokemon={pokemon} />
}
