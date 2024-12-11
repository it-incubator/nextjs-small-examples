'use client'


import React from "react";
import {PokemonsFreshList} from "@/features/pokemon/ui/pokemons-fresh-list";

export default function PokemonsPage({params}: any) {

  return (
    <div>
        <h2>Public Pokemon list without server preloading</h2>
      <PokemonsFreshList />
    </div>
  );
}
