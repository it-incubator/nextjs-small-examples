'use client'
import {PokemonsList} from "@/features/pokemon/ui/pokemons-list";


export default function PokemonsPage({params}: any) {

  return (
    <div>
        <h2>Public Pokemon list without server preloading</h2>
      <PokemonsList />
    </div>
  );
}