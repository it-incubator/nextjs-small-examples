import {PokemonsFreshList} from "@/features/pokemon/ui/pokemons-fresh-list";


export default async function PokemonsPage({params}: any) {
    console.log('LOAD POKEMONS ON SERVER')
    const pokemonsResponse = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10')
    const pokemons = await pokemonsResponse.json();
    console.log('POKEMONS LOADED')

  return (
    <div>
        <h2>Public Pokemon list</h2>
      <PokemonsFreshList pokemons={pokemons.results}/>
    </div>
  );
}
