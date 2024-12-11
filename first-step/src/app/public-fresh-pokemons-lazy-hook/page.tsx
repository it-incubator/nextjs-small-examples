import {PokemonsFreshListLazy} from "@/features/pokemon/ui/pokemons-refresh-list-lazy-query";


export default async function PokemonsPage({params}: any) {
    console.log('LOAD POKEMONS ON SERVER!!!')
    const pokemonsResponse = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10')
    const pokemons = await pokemonsResponse.json();
    console.log('POKEMONS LOADED')

  return (
    <div>
        <h2>Public Pokemon list lazy hook</h2>
      <PokemonsFreshListLazy pokemons={pokemons.results}/>
    </div>
  );
}